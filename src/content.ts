// Utility functions to blur and unBlur videos
const blurVideo = (element: HTMLElement) => {
  element.style.filter = "blur(20px)";
  element.style.pointerEvents = "none";
};

const unBlurVideo = (element: HTMLElement) => {
  element.style.filter = "none";
  element.style.pointerEvents = "auto";
};

// Function to apply filtering based on keywords
const filterVideos = (keywords: string[]) => {
  if (!keywords.length) return;

  // Selecting video elements from the YouTube page
  const videoItems = document.querySelectorAll(
    "ytd-rich-item-renderer, ytd-video-renderer"
  );

  videoItems.forEach((item) => {
    const titleElement = item.querySelector("#video-title") as HTMLElement;
    const titleText = titleElement?.textContent?.toLowerCase() || "";

    // Checking if the title contains any of the keywords
    const containsKeyword = keywords.some((keyword) =>
      titleText.includes(keyword.toLowerCase())
    );

    // Applying blur or unBlur based on whether the video matches a keyword
    if (containsKeyword) {
      unBlurVideo(item as HTMLElement);
    } else {
      blurVideo(item as HTMLElement);
    }
  });
};

// Fetching keywords from Chrome storage and filter the videos
const fetchAndFilterKeywords = () => {
  chrome.storage.local.get("selectedWorkspace", (result) => {
    const workspace = result.selectedWorkspace;
    const keywords = workspace ? workspace.keywords : [];

    console.log(`Applying keywords: ${keywords.join(", ")}`);
    filterVideos(keywords);
  });
};

// Setting up a MutationObserver to watch for video content changes
const observeVideos = () => {
  const videoContainer = document.querySelector("ytd-browse, ytd-search");

  if (!videoContainer) {
    // Retrying after a short delay if the container isn't found yet
    setTimeout(observeVideos, 500);
    return;
  }

  const observer = new MutationObserver(() => {
    fetchAndFilterKeywords();
  });

  // Starting to observing the video container for changes
  observer.observe(videoContainer, { childList: true, subtree: true });

  // Applying initial filtering to videos already loaded
  setTimeout(fetchAndFilterKeywords, 500);
};

// Listening for changes to the selected workspace in Chrome storage
chrome.storage.onChanged.addListener((changes) => {
  if (changes.selectedWorkspace) {
    console.log(
      "Selected workspace updated:",
      changes.selectedWorkspace.newValue
    );
    fetchAndFilterKeywords();
  }
});

// Waiting for the page to load before starting the observation
window.addEventListener("load", () => {
  observeVideos();
});
