// Step 1: Install Pexels library (via npm/yarn as mentioned in package.json)
// npm install pexels --save
// or
// yarn add pexels

// Load Pexels library to interact with the API
const { createClient } = require('pexels');
// Load fs library to work with the file system
const fs = require('fs');
// Load path library to work with file paths
const path = require('path');
// Load environment variables from .env file (very important for API key security)
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


// Check if PEXELS_API_KEY exists
if (!process.env.PEXELS_API_KEY || process.env.PEXELS_API_KEY === "YOUR_PEXELS_API_KEY_HERE") {
  console.error(" Error: PEXELS_API_KEY environment variable is not defined or set. Please create a .env file in the project root and add PEXELS_API_KEY=\"YOUR_KEY_HERE\" ");
  process.exit(1); // Exit the script if the key is not found
}

// Create a Pexels client using the API key from environment variables
const client = createClient(process.env.PEXELS_API_KEY);

// Load image requirements from image_requirements.json file
const imageRequirements = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../image_requirements.json'), 'utf8'));

// Helper function to sanitize names for file paths
function sanitizeCategoryName(name) {
  // Replace slashes with hyphens and remove any characters that are not letters, numbers, spaces, or hyphens
  // Then replace spaces with hyphens and convert to lowercase for consistency
  return name
    .replace(/\//g, '-') // Replace slashes with hyphens
    .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove invalid file name characters except space and hyphen
    .replace(/\s+/g, '-') // Replace one or more spaces with a single hyphen
    .toLowerCase(); // Convert to lowercase
}

// Main asynchronous function to perform download operations
(async () => {
  console.log(' Starting image download process... ');
  try {
    // Iterate through each business type requirement
    for (const businessTypeReq of imageRequirements) {
      const sanitizedBusinessType = sanitizeCategoryName(businessTypeReq.businessType);
      console.log(` Processing business type: ${businessTypeReq.businessType} `);

      // Process general images for the business type
      if (businessTypeReq.generalImages) {
        for (const generalImageReq of businessTypeReq.generalImages) {
          const sanitizedPlacement = sanitizeCategoryName(generalImageReq.placement);
          const query = generalImageReq.keywords.join(',');
          const count = generalImageReq.count;

          const dir = path.join(__dirname, '../public/assets/products/', sanitizedBusinessType, 'general', sanitizedPlacement);

          // Create the directory if it doesn't exist
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(` Created directory: ${dir} `);
          } else {
            console.log(` Directory ${dir} already exists. `);
          }

          console.log(` Searching Pexels for "${query}" (${count} images)... `);
          try {
            const response = await client.photos.search({ query: query, per_page: count });

            if (response.photos && response.photos.length > 0) {
              console.log(` Found ${response.photos.length} images. Downloading... `);
              for (let i = 0; i < response.photos.length; i++) {
                const photo = response.photos[i];
                const imageUrl = photo.src.large; // Using large size
                const filename = path.join(dir, `${sanitizedBusinessType}-general-${sanitizedPlacement}-${i + 1}.jpg`);

                try {
                  console.log(` Downloading image: ${imageUrl} `);
                  const imageResponse = await fetch(imageUrl);
                  if (!imageResponse.ok) {
                    console.error(` Error downloading image ${imageUrl}: ${imageResponse.statusText} `);
                    continue; // Skip to the next image on error
                  }
                  const arrayBuffer = await imageResponse.arrayBuffer();
                  fs.writeFileSync(filename, Buffer.from(arrayBuffer));
                  console.log(` ✅ Downloaded and saved image: ${filename} `);
                } catch (fetchError) {
                  console.error(` Error fetching or saving image ${filename}: `, fetchError);
                }
              }
            } else {
              console.warn(` ⚠️ No images found for: "${query}" `);
            }
          } catch (searchError) {
             console.error(` ❌ Error searching Pexels for "${query}": `, searchError);
          }
        }
      }

      // Process images for specific categories within the business type
      if (businessTypeReq.categories) {
        for (const categoryReq of businessTypeReq.categories) {
          const sanitizedCategory = sanitizeCategoryName(categoryReq.name);
          console.log(`   Processing category: ${categoryReq.name} `);

          if (categoryReq.imageUsage) {
            for (const imageUsageReq of categoryReq.imageUsage) {
              const sanitizedPlacement = sanitizeCategoryName(imageUsageReq.placement);
              const query = imageUsageReq.keywords.join(',');
              const count = imageUsageReq.count;

              const dir = path.join(__dirname, '../public/assets/products/', sanitizedBusinessType, sanitizedCategory, sanitizedPlacement);

              // Create the directory if it doesn't exist
              if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                console.log(` Created directory: ${dir} `);
              } else {
                console.log(` Directory ${dir} already exists. `);
              }

              console.log(`   Searching Pexels for "${query}" (${count} images)... `);
              try {
                const response = await client.photos.search({ query: query, per_page: count });

                if (response.photos && response.photos.length > 0) {
                  console.log(`   Found ${response.photos.length} images. Downloading... `);
                  for (let i = 0; i < response.photos.length; i++) {
                    const photo = response.photos[i];
                    const imageUrl = photo.src.large; // Using large size
                    const filename = path.join(dir, `${sanitizedBusinessType}-${sanitizedCategory}-${sanitizedPlacement}-${i + 1}.jpg`);

                    try {
                      console.log(`   Downloading image: ${imageUrl} `);
                      const imageResponse = await fetch(imageUrl);
                      if (!imageResponse.ok) {
                        console.error(`   Error downloading image ${imageUrl}: ${imageResponse.statusText} `);
                        continue; // Skip to the next image on error
                      }
                      const arrayBuffer = await imageResponse.arrayBuffer();
                      fs.writeFileSync(filename, Buffer.from(arrayBuffer));
                      console.log(`   ✅ Downloaded and saved image: ${filename} `);
                    } catch (fetchError) {
                      console.error(`   ❌ Error fetching or saving image ${filename}: `, fetchError);
                    }
                  }
                } else {
                  console.warn(`   ⚠️ No images found for: "${query}" `);
                }
              } catch (searchError) {
                 console.error(`   ❌ Error searching Pexels for "${query}": `, searchError);
              }
            }
          }
        }
      }
      console.log(`----- Finished processing business type: ${businessTypeReq.businessType} -----`);
    }
    console.log(' 🎉 Finished downloading all specified images successfully! ');
  } catch (error) {
    // Handle general errors that may occur during script execution
    console.error(" ❌ A general error occurred during the image download process: ", error);
    if (error.message && error.message.includes('401')) {
      console.error(" Your PEXELS API key might be invalid or expired. Please check it in the .env file. ");
    }
  }
})();

// To run this script:
// 1. Make sure you have pexels and dotenv installed: npm install pexels dotenv or yarn add pexels dotenv
// 2. Create a .env file in the project root and add PEXELS_API_KEY="YOUR_ACTUAL_API_KEY"
// 3. Run the script using: node scripts/download-products.js
// or via the script added in package.json: npm run download:products