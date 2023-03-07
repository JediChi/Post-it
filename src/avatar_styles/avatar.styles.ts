const avatarStyles = [
    'adventurer',
    'adventurer-neutral',
    'avataaars',
    'avataaars-neutral',
    'big-ears',
    'big-ears-neutral',
    'big-smile',
    'bottts',
    'bottts-neutral',
    'croodles',
    'croodles-neutral',
    'fun-emoji',
    'icons',
    'identicon',
    'initials',
    'lorelei',
    'lorelei-neutral',
    'micah',
    'miniavs',
    'open-peeps',
    'personas',
    'pixel-art',
    'pixel-art-neutral',
    'shapes',
    'thumbs'
   ];
   
   
//    const getRandomAvatarStyle = () => {
    
//    }

function getRandomAvatarStyle(styles: string[]): string {
    const randomIndex = Math.floor(Math.random() * styles.length);
    return styles[randomIndex];
  }
  
//   const stringsArray = ["apple", "banana", "cherry", "durian", "elderberry"];
//   const randomStr = getRandomAvatarStyle(avatarStyles);
//   console.log(randomStr); // Prints a random string from the array
  
   