const barsContainer = document.getElementById('bars');

// Function to generate bars with random heights and numbers
function generateBars() {
  barsContainer.innerHTML = ''; // Clear existing bars
  const barCount = 14; // Number of bars
  const maxValue = 100; // Maximum value for bar height

  for (let i = 0; i < barCount; i++) {
    const value = Math.floor(Math.random() * maxValue) + 1;

    // Create a bar element
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value * 4}px`; // Scale height (adjust multiplier if needed)
    bar.textContent = value; // Add the number inside the bar

    barsContainer.appendChild(bar);
  }
}

// Bubble Sort algorithm with visualization
async function bubbleSort() {
  const bars = Array.from(document.querySelectorAll('.bar'));
  const delay = 300; // Delay in ms for visualization

  for (let i = 0; i < bars.length - 1; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      // Highlight bars being compared
      bars[j].style.background = 'orange';
      bars[j + 1].style.background = 'orange';

      const value1 = parseInt(bars[j].textContent, 10);
      const value2 = parseInt(bars[j + 1].textContent, 10);

      if (value1 > value2) {
        // Swap heights and text
        [bars[j].style.height, bars[j + 1].style.height] = [bars[j + 1].style.height, bars[j].style.height];
        [bars[j].textContent, bars[j + 1].textContent] = [bars[j + 1].textContent, bars[j].textContent];
      }

      await new Promise((resolve) => setTimeout(resolve, delay)); // Pause for visualization

      // Reset colors
      bars[j].style.background = '#007bff';
      bars[j + 1].style.background = '#007bff';
    }

    // Mark sorted bar
    bars[bars.length - i - 1].style.background = '#28a745';
  }

  // Mark all bars as sorted
  bars[0].style.background = '#28a745';
}

// Selection Sort algorithm with visualization
async function selectionSort() {
  const bars = Array.from(document.querySelectorAll('.bar'));
  const delay = 200; // Delay in ms for visualization

  for (let i = 0; i < bars.length; i++) {
    let minIndex = i;

    // Highlight the current bar
    bars[i].style.background = 'orange';

    for (let j = i + 1; j < bars.length; j++) {
      // Highlight the bar being compared
      bars[j].style.background = 'orange';

      const value1 = parseInt(bars[minIndex].textContent, 10);
      const value2 = parseInt(bars[j].textContent, 10);

      if (value2 < value1) {
        minIndex = j;
      }

      await new Promise((resolve) => setTimeout(resolve, delay)); // Pause for visualization
      bars[j].style.background = '#007bff'; // Reset color
    }

    // Swap if necessary
    if (minIndex !== i) {
      [bars[i].style.height, bars[minIndex].style.height] = [bars[minIndex].style.height, bars[i].style.height];
      [bars[i].textContent, bars[minIndex].textContent] = [bars[minIndex].textContent, bars[i].textContent];
    }

    // Mark the sorted bar
    bars[i].style.background = '#28a745';
  }
}

// Generate bars on page load
generateBars();






// Quick Sort algorithm with visualization
async function quickSort(low = 0, high = null, bars = Array.from(document.querySelectorAll('.bar'))) {
  const delay = 300; // Delay in ms for visualization

  if (high === null) high = bars.length - 1; // Initialize high on first call

  if (low < high) {
    const pivotIndex = await partition(bars, low, high, delay);
    await quickSort(low, pivotIndex - 1, bars);
    await quickSort(pivotIndex + 1, high, bars);
  }

  if (low === 0 && high === bars.length - 1) {
    // Mark all bars as sorted at the end
    bars.forEach(bar => (bar.style.background = '#28a745'));
  }
}

async function partition(bars, low, high, delay) {
  const pivotValue = parseInt(bars[high].textContent, 10);
  bars[high].style.background = 'red'; // Highlight pivot
  let i = low - 1;

  for (let j = low; j < high; j++) {
    bars[j].style.background = 'orange'; // Highlight current bar
    await new Promise(resolve => setTimeout(resolve, delay));

    const value = parseInt(bars[j].textContent, 10);
    if (value < pivotValue) {
      i++;
      [bars[i].style.height, bars[j].style.height] = [bars[j].style.height, bars[i].style.height];
      [bars[i].textContent, bars[j].textContent] = [bars[j].textContent, bars[i].textContent];
    }
    bars[j].style.background = '#007bff'; // Reset bar color
  }

  // Swap pivot with the element at i + 1
  [bars[i + 1].style.height, bars[high].style.height] = [bars[high].style.height, bars[i + 1].style.height];
  [bars[i + 1].textContent, bars[high].textContent] = [bars[high].textContent, bars[i + 1].textContent];
  bars[high].style.background = '#007bff'; // Reset pivot color

  return i + 1;
}

// Merge Sort algorithm with visualization
async function mergeSort(bars = Array.from(document.querySelectorAll('.bar')), left = 0, right = null) {
  const delay = 300; // Delay in ms for visualization

  if (right === null) right = bars.length - 1;

  if (left < right) {
    const mid = Math.floor((left + right) / 2);

    await mergeSort(bars, left, mid);
    await mergeSort(bars, mid + 1, right);
    await merge(bars, left, mid, right, delay);
  }

  if (left === 0 && right === bars.length - 1) {
    // Mark all bars as sorted at the end
    bars.forEach(bar => (bar.style.background = '#28a745'));
  }
}

async function merge(bars, left, mid, right, delay) {
  const leftArray = [];
  const rightArray = [];

  for (let i = left; i <= mid; i++) {
    leftArray.push(parseInt(bars[i].textContent, 10));
  }
  for (let i = mid + 1; i <= right; i++) {
    rightArray.push(parseInt(bars[i].textContent, 10));
  }

  let i = 0,
    j = 0,
    k = left;

  while (i < leftArray.length && j < rightArray.length) {
    bars[k].style.background = 'orange'; // Highlight current bar
    await new Promise(resolve => setTimeout(resolve, delay));

    if (leftArray[i] <= rightArray[j]) {
      bars[k].style.height = `${leftArray[i] * 4}px`;
      bars[k].textContent = leftArray[i];
      i++;
    } else {
      bars[k].style.height = `${rightArray[j] * 4}px`;
      bars[k].textContent = rightArray[j];
      j++;
    }

    bars[k].style.background = '#007bff'; // Reset bar color
    k++;
  }

  while (i < leftArray.length) {
    bars[k].style.background = 'orange';
    await new Promise(resolve => setTimeout(resolve, delay));

    bars[k].style.height = `${leftArray[i] * 4}px`;
    bars[k].textContent = leftArray[i];
    bars[k].style.background = '#007bff';
    i++;
    k++;
  }

  while (j < rightArray.length) {
    bars[k].style.background = 'orange';
    await new Promise(resolve => setTimeout(resolve, delay));

    bars[k].style.height = `${rightArray[j] * 4}px`;
    bars[k].textContent = rightArray[j];
    bars[k].style.background = '#007bff';
    j++;
    k++;
  }
}

