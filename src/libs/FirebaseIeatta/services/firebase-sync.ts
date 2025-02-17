// import { deleteLocalImage, SqlPhoto } from '@shared-sql/model/sql-photo'
// import { SqlRepository } from '@shared-sql/repository/sql-repository'
import FirebasePhoto from './firebase-photo';

class FirebaseSync {
    // eslint-disable-next-line @lwc/lwc/no-async-await
    static async start() {
        // const photos: SqlPhoto[] = await SqlRepository.findAllPhotos()
        // photos.forEach(async (photo) => {
        //   // online mode
        //   let hasException = false
        //   // First of all, upload image to cloudinary.
        //   try {
        //     await FirebasePhoto.savePhotoWithCloudinary({
        //       imagePath: photo.offlinePath,
        //       uniqueId: photo.id
        //     })
        //   } catch (error) {
        //     // Exception throw from uploading image to cloudinary
        //     hasException = true
        //   }
        //   // Finally, delete it in the sqlite.
        //   if (hasException === false) {
        //     await SqlRepository.deletePhoto(photo)
        //     await deleteLocalImage(photo.offlinePath)
        //   }
        // })
    }
}

export default FirebaseSync;
