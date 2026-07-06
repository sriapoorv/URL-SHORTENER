// import { generateNanoId } from "../utils/helper.js";
// import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js";

// // For guests (no user)
// export const createShortUrlWithoutUser = async (url) => {
//     let shortUrl;
//     let exists;

//     do {
//         shortUrl = generateNanoId(7);
//         exists = await getCustomShortUrl(shortUrl);
//     } while (exists); // keep generating until we get a unique one

//     await saveShortUrl(shortUrl, url);
//     return shortUrl;
// };

// // For logged-in users
// export const createShortUrlWithUser = async (url, userId, slug = null) => {
//     const shortUrl = slug || generateNanoId(7);

//     const exists = await getCustomShortUrl(shortUrl);
//     if (exists) {
//         throw new Error("This short URL already exists, choose another one");
//     }

//     await saveShortUrl(shortUrl, url, userId);
//     return shortUrl;
// };









import { generateNanoId } from "../utils/helper.js";
import urlSchema from '../models/short_url.model.js';
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js";




export const createShortUrlWithoutUser = async (url) => {
    let shortUrl;
    let saved = false;

    while (!saved) {
        try {
            shortUrl = generateNanoId(7);
            await saveShortUrl(shortUrl, url);
            saved = true; // success
        } catch (err) {
            if (err.statusCode === 409) {
                // collision → retry with a new ID
                continue;
            }
            throw err; // bubble up other errors
        }
    }

    return shortUrl;
};


// export const createShortUrlWithoutUser = async (url) =>{
//     try {
//         const shortUrl = generateNanoId(7);
//         if(!shortUrl) throw new Error("Short URL not generated")
//         await saveShortUrl(shortUrl, url)
//         return shortUrl;    
//     } catch (err) {
//         console.log(err, "this one");
//         throw err;
//     }
//}


export const createShortUrlWithUser = async (url, userId, slug = null) => {
    const shortUrl = slug || generateNanoId(7);

    try {
        await saveShortUrl(shortUrl, url, userId);
        return shortUrl;
    } catch (err) {
        if (err.statusCode === 409) {
            throw new Error("This short URL already exists, please choose another one");
        }
        throw err;
    }
};

// export const createShortUrlWithUser = async (url, userId, slug=null) =>{
//     const shortUrl = slug || generateNanoId(7);
//     const exists = await getCustomShortUrl(slug);
//     if(exists) throw new Error("This custom URL already exists")
//     await saveShortUrl(shortUrl, url, userId)
//     return shortUrl;
// }