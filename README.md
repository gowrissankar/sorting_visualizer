# SortViz
**Collaborative Sorting Algorithm Visualizer and Performance Charting Platform**

*Sorting out patterns from chaos*

## Overview

**SortViz** is a full-stack educational platform designed to make sorting algorithms both intuitive and interactive. It combines algorithm visualization with **real-time** performance charting based on empirical data collected from all users. Learners can visually trace how an algorithm processes data, making it easier to build an **intuitive understanding** of sorting logic and performance.

Unlike traditional visualizers, SortViz introduces a collaborative performance chart powered by Chart.js and backed by Supabase. It dynamically tracks and displays average comparison counts for each algorithm and input size, **evolving continuously** with user interaction. This provides learners with visual and experimental insight into how time complexity plays out in practice.

The project originated from a desire to better understand algorithmic complexity through experimentation—specifically, to visualize what time complexity actually looks and feels like in real scenarios. It now serves as a scalable educational and research tool that bridges the gap between theoretical analysis and visual, intuitive understanding of both sorting algorithms and their performance characteristics.

## Key Features

### Interactive Visualization

- Implements five sorting algorithms (**Bubble**, **Selection**, **Insertion**, **Merge**, **Quick**) with **real-time** bar animations  
- Adjustable animation speed and array size (10 to 100 elements)  
- Uses color-coded bar states to indicate comparisons and swaps  

### Real-Time Performance Analytics

- Visualizes performance data using Chart.js with clean, responsive charts  
- **Helps users visually and intuitively understand what time complexity means in practice, enabling experimental validation of algorithm behavior over time**  
- Backend powered by Supabase aggregates total comparisons and sample counts  
- Averages are computed automatically by the database for efficiency  
- Chart updates reflect real-world data trends and algorithm scaling behavior  

## Visualized Algorithms & Sidebar Insights

SortViz brings to life five core sorting algorithms through step-by-step visualizations:

- **Bubble Sort** – Visualizes swaps and repeated comparisons  
- **Selection Sort** – Highlights selection and placement phases  
- **Insertion Sort** – Shows gradual growth of sorted section  
- **Merge Sort** – Demonstrates divide-and-conquer logic  
- **Quick Sort** – Depicts recursive partitioning in action  

The sidebar includes each algorithm’s **description**, **time/space complexity**, and **pseudocode**. It also helps interpret the **performance chart**, explaining how average comparisons change with input size and linking visual trends to theoretical time complexities. **This guidance allows users to understand what the graphs represent and how to interpret performance results for each algorithm.**

## Technology Stack

| Layer         | Technologies Used                                   |
| ------------- | --------------------------------------------------- |
| Frontend      | React 18, Vite, Tailwind CSS                        |
| Visualization | Chart.js, react-chartjs-2                           |
| Backend       | Supabase (PostgreSQL + REST API)                    |
| Database      | Atomic upserts (custom function), generated columns |
| Deployment    | Vercel with automated CI/CD pipeline                |

### Upsert Mechanism

SortViz avoids data duplication and ensures consistency using a Supabase stored procedure. For each `(algorithm, size)` combination:

- `total_comparisons` accumulates the total number of comparisons across users  
- `sample_count` tracks how many runs have been recorded  
- `average_comparisons` is computed automatically as a generated column  

This approach makes the system efficient, avoids race conditions, and enables **real-time** collaborative analytics.

## Directory Structure

```text
src/
├── components/         // Navbar, Controls, Chart, Array container
├── algorithms/         // Sorting logic (bubble, merge, quick, etc.)
├── services/           // Supabase integration and data operations
├── constants/          // Config and static educational content
├── utils/              // Helper functions
└── styles/             // Custom slider styling and theme
```

## Installation Guide

### Prerequisites

- Node.js (v18 or above)  
- npm or yarn  
- Git  
- A Supabase project (free tier supported)  

### Setup Instructions

```bash
git clone https://github.com/yourusername/sortviz.git
cd sortviz
npm install
```

Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Then run the development server:

```bash
npm run dev
```

Navigate to [http://localhost:5173](http://localhost:5173) in your browser.

## Contribution Model

Each user session contributes to a live dataset:

- Comparisons for a given algorithm and array size are submitted  
- The backend updates the total comparison count and sample count using a race-condition-safe upsert  
- The average is re-computed automatically and reflected in the live performance chart  

This enables **a continuously improving model** of sorting performance backed by real-world data.

## Live Experience

- Select an algorithm and configure array parameters  
- Watch **real-time** visualization with color-coded element states  
- Analyze performance in the collaborative analytics dashboard  
- Compare algorithms using empirical data from global users  

## Learning Outcomes

- **Educational Tool** – Transforms abstract algorithmic concepts into visual, interactive experiences  
- **Research Platform** – Provides empirical data on algorithm performance across different scenarios  
- **Technical Showcase** – Demonstrates full-stack development skills with modern web technologies  
- **Collaborative Learning** – Creates a shared knowledge base through user-contributed performance data  
- Visualize **algorithm behavior and time complexity** in practice rather than just theory  
- Learn by experimentation with **real-time** inputs and evolving performance graphs  
- Understand sorting trade-offs through **interactive comparisons** and empirical data  

## About the Developer

I am Gowrisankar, a full-stack developer focused on building educational tools with clean design and practical usability. SortViz is a product of my personal journey learning algorithms to provide a clear visual and intuitive learning experience using realtime metrics.


## License

This project is licensed under the MIT License.
