export const avatarStyles = [
  "adventurer",
  "adventurer-neutral",
  "avataaars",
  "avataaars-neutral",
  "big-ears",
  "big-ears-neutral",
  "big-smile",
  "bottts",
  "bottts-neutral",
  "croodles",
  "croodles-neutral",
  "fun-emoji",
  "icons",
  "identicon",
  "initials",
  "lorelei",
  "lorelei-neutral",
  "micah",
  "miniavs",
  "open-peeps",
  "personas",
  "pixel-art",
  "pixel-art-neutral",
  "shapes",
  "thumbs",
];

export default function getRandomAvatarStyle(styles: string[]): string {
  const randomIndex = Math.floor(Math.random() * styles.length);
  return styles[randomIndex];
}

export const generateRandomAvatar = async (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const _email = email.trim();

  const isValidEmail = emailRegex.test(_email);
  if (!isValidEmail) {
    throw new Error("Invalid email");
  }

  const entropySource = () => Math.random().toString(36).substring(2, 7);

  const replaceAt = `-${entropySource()}-`;
  const replaceDot = `-${entropySource()}-`;

  const seed = _email.replace("@", replaceAt).replace(/\./g, replaceDot);

  const randomAvatarStyle = getRandomAvatarStyle(avatarStyles);

  if (!randomAvatarStyle || !avatarStyles.includes(randomAvatarStyle)) {
    throw new Error("Something failed: ");
  }

  const avatarUrl = `https://api.dicebear.com/5.x/${randomAvatarStyle}/svg?seed=${seed}&size=200&radius=50`;

  return avatarUrl;
};

