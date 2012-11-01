Epiphyte
==========
*An epiphyte is a plant that grows on other plants (or powerwires etc). An epiphyte, unlike parasites, does not take any of it's nutrients from the plant it grows on. More commonly it takes it's nutrition from the surrounding air*

Epiphyte enables remote storage for [herbalism](https://github.com/herbalism) aplications. Remote storage is a part of the #unhosted specification.

Objects
----------
**User** A user object is used to authenticate with a remote storage. When you request a user you specify which categories  you need to authenticate with. The user will be returned as an *optional* that is absent in case the user is not logged in. The absen promise provides a login function whenever the user is absent and the present function returns a user object whenever the user is present.

**Storage** The storage is requested with a user-optional and returns an optional. Whenever the user is present the storage is present. The storage has methods to get and put string data.

**File** The file-object is requested with a storage. The fileobject is present whenever the storage is present. The storage can store Blob-objects and Files. The files are queued for storage and save asunchronously. The status of the save can be read as file-statuses from the returned queue.
