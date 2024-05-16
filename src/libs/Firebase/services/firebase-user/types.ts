type IFirebaseUser = {
    updateFirebaseUserName(displayName: string): Promise<void>;
    updateFirebaseUserPhoto(photoURL: string): Promise<void>;
};

export default IFirebaseUser;
