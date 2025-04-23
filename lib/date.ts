export function getTimeAgo(createdAt: string | Date | number): string {
  const date = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (seconds < 60) return "Just now";
  if (minutes < 2) return "Few minutes ago";
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 2) return "Few hours ago";
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getTimeUntil(targetDate: string | Date | number): string {
  const date = new Date(targetDate);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();

  if (diffMs <= 0) return "Already passed";

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / 60);
  const hours = Math.floor(diffMs / (60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (seconds < 60) return "A few seconds";
  if (minutes < 2) return "A minute";
  if (minutes < 60) return `${minutes} minutes`;
  if (hours < 2) return "An hour";
  if (hours < 24) return `${hours} hours`;
  if (days === 1) return "Tomorrow";
  if (days <= 90) return `${days} days`;

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
