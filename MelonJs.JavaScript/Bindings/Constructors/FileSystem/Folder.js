﻿class Folder {
    constructor(folderInfo = { name: "", path: "", content: [], folders: [] }) {
        folderInfo.content.forEach(file => {
            if (!(file instanceof File)) {
                this._errValidFiles();
            }
        });

        this.folderName = folderInfo.name;
        this.content = folderInfo.content;
        this.folders = folderInfo.folders;
    }

    add(target) {
        if (file instanceof File) {
            this.content.push(target);
            return;
        }

        if (file instanceof Folder) {
            this.folders.push(target.folderPath);
            return;
        }

        this._errValidFiles();
    }

    save(path) {
        melon_internal_create_folder(path);
        this.content.forEach(file => file.save(path + file.fileName));
    }

    _errValidFiles() {
        throw new Error("Only valid files can be added to a Folder object.");
    }
}

Folder.load = (path) => {
    const loadedFolder = new melon_internal_folder(path);

    return new Folder({
        name: loadedFolder.Name,
        path: loadedFolder.FolderPath,
        content: loadedFolder.Content
    });
}