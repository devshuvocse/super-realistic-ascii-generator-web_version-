# 🎨 Super Realistic ASCII Art Generator (Web Version)

Transform your images into stunning, super realistic ASCII art directly in your web browser! This project leverages modern web technologies to provide a rich, interactive, and visually appealing experience for generating ASCII art with advanced effects and customization.

## ✨ Features

-   **Stunning User Interface**: A modern, responsive design with animated backgrounds and smooth transitions built with React and Tailwind CSS.
-   **AI-Powered Realistic Processing**: Advanced image processing algorithms to convert images into highly detailed and realistic ASCII art.
-   **Multiple Character Sets**: Choose from various character sets (Detailed, Classic, Blocks, Dots, Braille) to achieve different artistic styles.
-   **Advanced Effects & Enhancements**: Apply a range of effects like enhanced detail, smooth gradients, edge enhancement, artistic styles, and dramatic lighting.
-   **Real-time Preview**: See your ASCII art generated instantly as you adjust settings.
-   **Customizable Settings**: Fine-tune parameters such as width, brightness, contrast, sharpness, and saturation for optimal results.
-   **Smart Background Handling**: Intelligent background removal and smart background generation for transparent images.
-   **Flexible Export Options**: Download your ASCII art as plain text, or beautifully styled HTML with various themes (Matrix, Terminal, Retro, Paper, Neon).
-   **Optimized Performance**: Efficient image processing for a smooth user experience.

## 🚀 Getting Started

Follow these steps to set up and run the Super Realistic ASCII Art Generator web version locally.
**There is a dummy version for this repo but more advence for android. If you want then have a try.**
**Browse**
```bash
https://drive.google.com/drive/folders/1qG7-O3CtwN7w4WOOBa2q15m4RDEKVEy4?usp=drive_link
```

### Prerequisites

Make sure you have Node.js and pnpm (or npm/yarn) installed on your system.

-   **Node.js**: [Download & Install Node.js](https://nodejs.org/en/download/)
-   **pnpm**: `npm install -g pnpm` (or use `npm` / `yarn` if preferred)

### Installation

1.  **Unzip the project**: If you received a `.zip` file, extract its contents:
    ```bash
    unzip super-realistic-ascii-generator(web_version).zip
    ```
    **OR** if you received a `.tar.gz` file, extract it:
    ```bash
        tar -xzvf super-realistic-ascii-generator(web_version).tar.gz
    ```
    **OR** if you received a `.tar` file, extract it:
    ```bash
        tar -xvf super-realistic-ascii-generator(web_version).tar
    ```
    **OR** copy the link and paste it into your terminal:
    ```bash
    git clone https://github.com/devshuvocse/super-realistic-ascii-generator-web_version-.git
    ```

2.  **Navigate to the project directory**:
    ```bash
    cd super-realistic-ascii-generator(web_version)
    ```

3.  **Install dependencies**:
    ```bash
    pnpm install
    # or npm install
    # or yarn install
    ```
    

### Running the Application

To start the development server and access the application in your browser:

```bash
pnpm run dev
# or npm run dev
# or yarn dev
```

Once the server starts, it will typically be accessible at `http://localhost:5173/` (or another port if 5173 is in use). Open this URL in your web browser.

## 💡 Usage

1.  **Select Image**: Click the 


"Select Image" button to upload an image from your computer.
2.  **Adjust Settings**: Use the control panel on the left to fine-tune various parameters:
    *   **Basic Settings**: Adjust `Width`, `Character Set`, and `Effects`.
    *   **Image Enhancement**: Control `Brightness`, `Contrast`, `Sharpness`, and `Saturation`.
    *   **Advanced Options**: Toggle `Adaptive Mapping`, `Preserve Detail`, `Aspect Correction`, and `Smart Background`.
    *   **Style Options**: Experiment with `Double Width`, `Add Spacing`, `Reverse Colors`, `Add Border`, and `Border Character`.
3.  **View Output**: The ASCII art will be generated automatically in the output panel.
4.  **Regenerate**: If you change settings after the initial generation, click "Regenerate" to apply the new parameters.
5.  **Export**: Use the "Copy" button to copy the ASCII art to your clipboard, or "Save" to download it as a `.txt`, `.html`, or `.md` file. When saving as HTML, you can choose from different themes.

## 🛠️ Technologies Used

-   **React**: A JavaScript library for building user interfaces.
-   **Vite**: A fast build tool for modern web projects.
-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **Shadcn/ui**: Reusable components built with Radix UI and Tailwind CSS.
-   **Framer Motion**: A library for production-ready animations.
-   **HTML Canvas API**: For client-side image processing.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please feel free to open an issue or submit a pull request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

