const fileInput = document.getElementById("fileInput");
const previewContainer = document.getElementById("preview");

fileInput.addEventListener("change", function () {
  const files = fileInput.files;
  previewContainer.innerHTML = "";

  for (const file of files) {
    const reader = new FileReader();

    reader.onload = function (event) {
      const fileType = getFileType(file.type);
      const mediaElement = createMediaElement(fileType, event.target.result);

      previewContainer.appendChild(mediaElement);

      mediaElement.addEventListener("mouseenter", function () {
        mediaElement.querySelector(".delete-btn").style.display = "block";
      });

      mediaElement.addEventListener("mouseleave", function () {
        mediaElement.querySelector(".delete-btn").style.display = "none";
      });

      mediaElement.querySelector(".delete-btn").addEventListener("click", function () {
        mediaElement.remove();
      });
    };

    reader.readAsDataURL(file);
  }
});

function getFileType(fileType) {
  if (fileType.startsWith("image")) {
    return "image";
  } else if (fileType.startsWith("video")) {
    return "video";
  } else {
    return "unknown";
  }
}

function createMediaElement(type, source) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("preview-item");

  let mediaElement;
  if (type === "image") {
    mediaElement = document.createElement("img");
    mediaElement.src = source;
  } else if (type === "video") {
    mediaElement = document.createElement("video");
    mediaElement.src = source;
    mediaElement.controls = true;
  } else {
    mediaElement = document.createElement("p");
    mediaElement.textContent = "Unsupported file format";
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = "&times;";
  deleteBtn.style.display = "none";

  wrapper.appendChild(mediaElement);
  wrapper.appendChild(deleteBtn);

  return wrapper;
}
