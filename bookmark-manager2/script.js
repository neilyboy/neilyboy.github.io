// Initialize Supabase client
const supabase = supabase.createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

let folders = [];
let selectedFolder = null;
let isGridView = false;

// DOM Elements
const folderList = document.getElementById('folderList');
const bookmarkList = document.getElementById('bookmarkList');
const addFolderBtn = document.getElementById('addFolderBtn');
const addBookmarkBtn = document.getElementById('addBookmarkBtn');
const addFolderModal = document.getElementById('addFolderModal');
const addBookmarkModal = document.getElementById('addBookmarkModal');
const newFolderName = document.getElementById('newFolderName');
const parentFolderSelect = document.getElementById('parentFolderSelect');
const newBookmarkTitle = document.getElementById('newBookmarkTitle');
const newBookmarkUrl = document.getElementById('newBookmarkUrl');
const newBookmarkTags = document.getElementById('newBookmarkTags');
const newBookmarkNotes = document.getElementById('newBookmarkNotes');
const saveFolderBtn = document.getElementById('saveFolderBtn');
const saveBookmarkBtn = document.getElementById('saveBookmarkBtn');
const cancelFolderBtn = document.getElementById('cancelFolderBtn');
const cancelBookmarkBtn = document.getElementById('cancelBookmarkBtn');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const modalBackdrop = document.getElementById('modalBackdrop');
const listViewBtn = document.getElementById('listViewBtn');
const gridViewBtn = document.getElementById('gridViewBtn');
const folderIconSelect = document.getElementById('folderIconSelect');
const folderIconGrid = document.getElementById('folderIconGrid');
const bookmarkIconSelect = document.getElementById('bookmarkIconSelect');
const bookmarkIconGrid = document.getElementById('bookmarkIconGrid');

const materialIcons = [
    'folder', 'work', 'home', 'school', 'favorite', 'star', 'book', 'music_note', 'movie', 'games',
    'bookmark', 'link', 'public', 'shopping_cart', 'flight', 'restaurant', 'sports_soccer', 'build',
    'code', 'bug_report', 'emoji_events', 'local_library', 'museum', 'camera_alt', 'directions_car'
];

// Event Listeners
addFolderBtn.addEventListener('click', openAddFolderModal);
addBookmarkBtn.addEventListener('click', openAddBookmarkModal);
saveFolderBtn.addEventListener('click', saveFolder);
saveBookmarkBtn.addEventListener('click', saveBookmark);
cancelFolderBtn.addEventListener('click', closeAddFolderModal);
cancelBookmarkBtn.addEventListener('click', closeAddBookmarkModal);
searchInput.addEventListener('input', searchAndFilterBookmarks);
filterSelect.addEventListener('change', searchAndFilterBookmarks);
listViewBtn.addEventListener('click', () => setViewMode(false));
gridViewBtn.addEventListener('click', () => setViewMode(true));

// Load data from Supabase
async function loadData() {
    try {
        const { data, error } = await supabase
            .from('folders')
            .select('*');
        
        if (error) throw error;
        
        folders = data || [];
        renderFolders();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Save data to Supabase
async function saveData() {
    try {
        for (const folder of folders) {
            if (folder.id) {
                const { error } = await supabase
                    .from('folders')
                    .update(folder)
                    .eq('id', folder.id);
                
                if (error) throw error;
            } else {
                const { data, error } = await supabase
                    .from('folders')
                    .insert([folder])
                    .select();
                
                if (error) throw error;
                
                folder.id = data[0].id;
            }
        }
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// Render folders
function renderFolders(parentFolder = null, level = 0) {
    const folderContainer = parentFolder ? document.createElement('div') : folderList;
    folderContainer.classList.add('nested-folder');
    
    folders.filter(folder => folder.parentId === (parentFolder ? parentFolder.id : null))
           .forEach(folder => {
        const folderElement = document.createElement('div');
        folderElement.classList.add('folder');
        folderElement.style.marginLeft = `${level * 15}px`;
        folderElement.innerHTML = `
            <span class="material-icons">${folder.icon || 'folder'}</span>
            ${folder.name}
        `;
        folderElement.addEventListener('click', () => selectFolder(folder.id));
        folderContainer.appendChild(folderElement);
        
        renderFolders(folder, level + 1);
    });
    
    if (parentFolder) {
        const parentElement = folderList.querySelector(`[data-folder-id="${parentFolder.id}"]`);
        if (parentElement) {
            parentElement.appendChild(folderContainer);
        }
    }
}

// Select folder
function selectFolder(folderId) {
    selectedFolder = folderId;
    addBookmarkBtn.classList.remove('hidden');
    renderBookmarks();
}

// Render bookmarks
function renderBookmarks() {
    bookmarkList.innerHTML = '';
    if (selectedFolder !== null) {
        const folder = folders.find(f => f.id === selectedFolder);
        folder.bookmarks.forEach((bookmark, index) => {
            const bookmarkElement = createBookmarkElement(bookmark, index);
            bookmarkList.appendChild(bookmarkElement);
        });
    }
    updateViewMode();
}

// Create bookmark element
function createBookmarkElement(bookmark, index) {
    const bookmarkElement = document.createElement('div');
    bookmarkElement.classList.add('bookmark');
    bookmarkElement.innerHTML = `
        <h3>
            <span class="material-icons">${bookmark.icon || 'bookmark'}</span>
            <a href="${bookmark.url}" target="_blank">${bookmark.title}</a>
        </h3>
        <p>${bookmark.notes}</p>
        <div class="tags">${renderTags(bookmark.tags)}</div>
        <div class="bookmark-actions">
            <button onclick="editBookmark('${selectedFolder}', ${index})"><span class="material-icons">edit</span>Edit</button>
            <button onclick="deleteBookmark('${selectedFolder}', ${index})"><span class="material-icons">delete</span>Delete</button>
        </div>
    `;
    return bookmarkElement;
}

// Render tags
function renderTags(tags) {
    return tags.map(tag => `<span class="tag">${tag}</span>`).join('');
}

// Open add folder modal
function openAddFolderModal() {
    populateParentFolderSelect();
    addFolderModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');
}

// Close add folder modal
function closeAddFolderModal() {
    addFolderModal.classList.add('hidden');
    modalBackdrop.classList.add('hidden');
}

// Populate parent folder select
function populateParentFolderSelect() {
    parentFolderSelect.innerHTML = '<option value="">Root</option>';
    folders.forEach(folder => {
        const option = document.createElement('option');
        option.value = folder.id;
        option.textContent = folder.name;
        parentFolderSelect.appendChild(option);
    });
}

// Save folder
async function saveFolder() {
    const folderName = newFolderName.value.trim();
    const parentId = parentFolderSelect.value;
    const icon = folderIconSelect.value;
    if (folderName) {
        const newFolder = {
            name: folderName,
            parentId: parentId || null,
            icon: icon,
            bookmarks: []
        };
        const { data, error } = await supabase
            .from('folders')
            .insert([newFolder])
            .select();
        
        if (error) {
            console.error('Error saving folder:', error);
            return;
        }
        
        folders.push(data[0]);
        renderFolders();
        newFolderName.value = '';
        closeAddFolderModal();
    }
}

// Open add bookmark modal
function openAddBookmarkModal() {
    addBookmarkModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');
}

// Close add bookmark modal
function closeAddBookmarkModal() {
    addBookmarkModal.classList.add('hidden');
    modalBackdrop.classList.add('hidden');
}

// Save bookmark
async function saveBookmark() {
    const title = newBookmarkTitle.value.trim();
    const url = newBookmarkUrl.value.trim();
    const tags = newBookmarkTags.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    const notes = newBookmarkNotes.value.trim();
    const icon = bookmarkIconSelect.value;
    if (title && url && selectedFolder !== null) {
        const folder = folders.find(f => f.id === selectedFolder);
        const newBookmark = { title, url, tags, notes, icon };
        folder.bookmarks.push(newBookmark);
        
        const { error } = await supabase
            .from('folders')
            .update({ bookmarks: folder.bookmarks })
            .eq('id', folder.id);
        
        if (error) {
            console.error('Error saving bookmark:', error);
            return;
        }
        
        renderBookmarks();
        newBookmarkTitle.value = '';
        newBookmarkUrl.value = '';
        newBookmarkTags.value = '';
        newBookmarkNotes.value = '';
        closeAddBookmarkModal();
    }
}

// Edit bookmark
async function editBookmark(folderId, index) {
    const folder = folders.find(f => f.id === folderId);
    const bookmark = folder.bookmarks[index];
    newBookmarkTitle.value = bookmark.title;
    newBookmarkUrl.value = bookmark.url;
    newBookmarkTags.value = bookmark.tags.join(', ');
    newBookmarkNotes.value = bookmark.notes;
    bookmarkIconSelect.value = bookmark.icon || 'bookmark';
    openAddBookmarkModal();
    saveBookmarkBtn.onclick = async function() {
        bookmark.title = newBookmarkTitle.value.trim();
        bookmark.url = newBookmarkUrl.value.trim();
        bookmark.tags = newBookmarkTags.value.split(',').map(tag => tag.trim()).filter(tag => tag);
        bookmark.notes = newBookmarkNotes.value.trim();
        bookmark.icon = bookmarkIconSelect.value;
        
        const { error } = await supabase
            .from('folders')
            .update({ bookmarks: folder.bookmarks })
            .eq('id', folder.id);
        
        if (error) {
            console.error('Error updating bookmark:', error);
            return;
        }
        
        renderBookmarks();
        closeAddBookmarkModal();
    };
}

// Delete bookmark
async function deleteBookmark(folderId, index) {
    if (confirm('Are you sure you want to delete this bookmark?')) {
        const folder = folders.find(f => f.id === folderId);
        folder.bookmarks.splice(index, 1);
        
        const { error } = await supabase
            .from('folders')
            .update({ bookmarks: folder.bookmarks })
            .eq('id', folder.id);
        
        if (error) {
            console.error('Error deleting bookmark:', error);
            return;
        }
        
        renderBookmarks();
    }
}

// Search and filter bookmarks
function searchAndFilterBookmarks() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;
    bookmarkList.innerHTML = '';
    
    folders.forEach(folder => {
        folder.bookmarks.forEach(bookmark => {
            if ((bookmark.title.toLowerCase().includes(searchTerm) ||
                 bookmark.url.toLowerCase().includes(searchTerm) ||
                 bookmark.notes.toLowerCase().includes(searchTerm) ||
                 bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm))) &&
                (filterValue === 'all' || (filterValue === 'untagged' && bookmark.tags.length === 0))) {
                const bookmarkElement = createBookmarkElement(bookmark);
                bookmarkList.appendChild(bookmarkElement);
            }
        });
    });
    updateViewMode();
}

// Set view mode
function setViewMode(isGrid) {
    isGridView = isGrid;
    updateViewMode();
}

// Update view mode
function updateViewMode() {
    if (isGridView) {
        bookmarkList.classList.add('grid-view');
        bookmarkList.classList.remove('list-view');
    } else {
        bookmarkList.classList.add('list-view');
        bookmarkList.classList.remove('grid-view');
    }
}

// Populate icon selects and grids
function populateIconSelects() {
    const iconSelects = [folderIconSelect, bookmarkIconSelect];
    const iconGrids = [folderIconGrid, bookmarkIconGrid];

    iconSelects.forEach((select, index) => {
        select.innerHTML = '';
        iconGrids[index].innerHTML = '';

        materialIcons.forEach(icon => {
            const option = document.createElement('option');
            option.value = icon;
            option.textContent = icon.replace('_', ' ');
            select.appendChild(option);

            const iconElement = document.createElement('span');
            iconElement.classList.add('material-icons', 'icon-option');
            iconElement.textContent = icon;
            iconElement.addEventListener('click', () => {
                select.value = icon;
            });
            iconGrids[index].appendChild(iconElement);
        });
    });
}

// Initialize
async function initialize() {
    await loadData();
    populateIconSelects();
}

// Call initialize to start the application
initialize();
