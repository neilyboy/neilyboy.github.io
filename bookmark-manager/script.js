let folders = [];
let selectedFolder = null;

// DOM Elements
const folderList = document.getElementById('folderList');
const bookmarkList = document.getElementById('bookmarkList');
const addFolderBtn = document.getElementById('addFolderBtn');
const addBookmarkBtn = document.getElementById('addBookmarkBtn');
const addFolderModal = document.getElementById('addFolderModal');
const addBookmarkModal = document.getElementById('addBookmarkModal');
const newFolderName = document.getElementById('newFolderName');
const newBookmarkTitle = document.getElementById('newBookmarkTitle');
const newBookmarkUrl = document.getElementById('newBookmarkUrl');
const newBookmarkNotes = document.getElementById('newBookmarkNotes');
const saveFolderBtn = document.getElementById('saveFolderBtn');
const saveBookmarkBtn = document.getElementById('saveBookmarkBtn');
const cancelFolderBtn = document.getElementById('cancelFolderBtn');
const cancelBookmarkBtn = document.getElementById('cancelBookmarkBtn');
const searchInput = document.getElementById('searchInput');

// Event Listeners
addFolderBtn.addEventListener('click', () => addFolderModal.classList.remove('hidden'));
addBookmarkBtn.addEventListener('click', () => addBookmarkModal.classList.remove('hidden'));
saveFolderBtn.addEventListener('click', saveFolder);
saveBookmarkBtn.addEventListener('click', saveBookmark);
cancelFolderBtn.addEventListener('click', () => addFolderModal.classList.add('hidden'));
cancelBookmarkBtn.addEventListener('click', () => addBookmarkModal.classList.add('hidden'));
searchInput.addEventListener('input', searchBookmarks);

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
function renderFolders() {
    folderList.innerHTML = '';
    folders.forEach((folder, index) => {
        const folderElement = document.createElement('div');
        folderElement.classList.add('folder');
        folderElement.textContent = folder.name;
        folderElement.addEventListener('click', () => selectFolder(index));
        folderList.appendChild(folderElement);
    });
}

// Select folder
function selectFolder(index) {
    selectedFolder = index;
    addBookmarkBtn.classList.remove('hidden');
    renderBookmarks();
}

// Render bookmarks
function renderBookmarks() {
    bookmarkList.innerHTML = '';
    if (selectedFolder !== null) {
        folders[selectedFolder].bookmarks.forEach((bookmark, index) => {
            const bookmarkElement = document.createElement('div');
            bookmarkElement.classList.add('bookmark');
            bookmarkElement.innerHTML = `
                <h3>${bookmark.title}</h3>
                <a href="${bookmark.url}" target="_blank">${bookmark.url}</a>
                <p>${bookmark.notes}</p>
                <button onclick="editBookmark(${index})">Edit</button>
                <button onclick="deleteBookmark(${index})">Delete</button>
            `;
            bookmarkList.appendChild(bookmarkElement);
        });
    }
}

// Save folder
function saveFolder() {
    const folderName = newFolderName.value.trim();
    if (folderName) {
        folders.push({ name: folderName, bookmarks: [] });
        saveData();
        renderFolders();
        newFolderName.value = '';
        addFolderModal.classList.add('hidden');
    }
}

// Save bookmark
function saveBookmark() {
    const title = newBookmarkTitle.value.trim();
    const url = newBookmarkUrl.value.trim();
    const notes = newBookmarkNotes.value.trim();
    if (title && url && selectedFolder !== null) {
        folders[selectedFolder].bookmarks.push({ title, url, notes });
        saveData();
        renderBookmarks();
        newBookmarkTitle.value = '';
        newBookmarkUrl.value = '';
        newBookmarkNotes.value = '';
        addBookmarkModal.classList.add('hidden');
    }
}

// Edit bookmark
function editBookmark(index) {
    const bookmark = folders[selectedFolder].bookmarks[index];
    newBookmarkTitle.value = bookmark.title;
    newBookmarkUrl.value = bookmark.url;
    newBookmarkNotes.value = bookmark.notes;
    addBookmarkModal.classList.remove('hidden');
    saveBookmarkBtn.onclick = function() {
        bookmark.title = newBookmarkTitle.value.trim();
        bookmark.url = newBookmarkUrl.value.trim();
        bookmark.notes = newBookmarkNotes.value.trim();
        saveData();
        renderBookmarks();
        addBookmarkModal.classList.add('hidden');
    };
}

// Delete bookmark
function deleteBookmark(index) {
    if (confirm('Are you sure you want to delete this bookmark?')) {
        folders[selectedFolder].bookmarks.splice(index, 1);
        saveData();
        renderBookmarks();
    }
}

// Search bookmarks
function searchBookmarks() {
    const searchTerm = searchInput.value.toLowerCase();
    bookmarkList.innerHTML = '';
    folders.forEach(folder => {
        folder.bookmarks.forEach(bookmark => {
            if (bookmark.title.toLowerCase().includes(searchTerm) ||
                bookmark.url.toLowerCase().includes(searchTerm) ||
                bookmark.notes.toLowerCase().includes(searchTerm)) {
                const bookmarkElement = document.createElement('div');
                bookmarkElement.classList.add('bookmark');
                bookmarkElement.innerHTML = `
                    <h3>${bookmark.title}</h3>
                    <a href="${bookmark.url}" target="_blank">${bookmark.url}</a>
                    <p>${bookmark.notes}</p>
                `;
                bookmarkList.appendChild(bookmarkElement);
            }
        });
    });
}

// Initialize
loadData();
