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

// Load data from localStorage
function loadData() {
    const savedFolders = localStorage.getItem('bookmarkFolders');
    if (savedFolders) {
        folders = JSON.parse(savedFolders);
        renderFolders();
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('bookmarkFolders', JSON.stringify(folders));
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
        folderElement.textContent = folder.name;
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
        <h3>${bookmark.title}</h3>
        <a href="${bookmark.url}" target="_blank">${bookmark.url}</a>
        <p>${bookmark.notes}</p>
        <div class="tags">${renderTags(bookmark.tags)}</div>
        <div class="bookmark-actions">
            <button onclick="editBookmark(${index})">Edit</button>
            <button onclick="deleteBookmark(${index})">Delete</button>
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
function saveFolder() {
    const folderName = newFolderName.value.trim();
    const parentId = parentFolderSelect.value;
    if (folderName) {
        const newFolder = {
            id: Date.now().toString(),
            name: folderName,
            parentId: parentId || null,
            bookmarks: []
        };
        folders.push(newFolder);
        saveData();
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
function saveBookmark() {
    const title = newBookmarkTitle.value.trim();
    const url = newBookmarkUrl.value.trim();
    const tags = newBookmarkTags.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    const notes = newBookmarkNotes.value.trim();
    if (title && url && selectedFolder !== null) {
        const folder = folders.find(f => f.id === selectedFolder);
        folder.bookmarks.push({ title, url, tags, notes });
        saveData();
        renderBookmarks();
        newBookmarkTitle.value = '';
        newBookmarkUrl.value = '';
        newBookmarkTags.value = '';
        newBookmarkNotes.value = '';
        closeAddBookmarkModal();
    }
}

// Edit bookmark
function editBookmark(index) {
    const folder = folders.find(f => f.id === selectedFolder);
    const bookmark = folder.bookmarks[index];
    newBookmarkTitle.value = bookmark.title;
    newBookmarkUrl.value = bookmark.url;
    newBookmarkTags.value = bookmark.tags.join(', ');
    newBookmarkNotes.value = bookmark.notes;
    openAddBookmarkModal();
    saveBookmarkBtn.onclick = function() {
        bookmark.title = newBookmarkTitle.value.trim();
        bookmark.url = newBookmarkUrl.value.trim();
        bookmark.tags = newBookmarkTags.value.split(',').map(tag => tag.trim()).filter(tag => tag);
        bookmark.notes = newBookmarkNotes.value.trim();
        saveData();
        renderBookmarks();
        closeAddBookmarkModal();
    };
}

// Delete bookmark
function deleteBookmark(index) {
    if (confirm('Are you sure you want to delete this bookmark?')) {
        const folder = folders.find(f => f.id === selectedFolder);
        folder.bookmarks.splice(index, 1);
        saveData();
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

// Initialize
loadData();
