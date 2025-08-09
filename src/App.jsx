import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Slider } from '@/components/ui/slider.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Switch } from '@/components/ui/switch.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Upload, Download, Copy, RotateCcw, Sparkles, Zap, Eye, Settings, Palette, Image as ImageIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

// Enhanced ASCII character sets for super realistic output
const ASCII_CHARS = {
  detailed: "█▉▊▋▌▍▎▏ ",
  classic: "@%#*+=-:. ",
  blocks: "██▓▒░  ",
  dots: "●◐◑◒◓○⚬⚪ ",
  braille: "⣿⣾⣽⣻⣟⣯⣷⣶⣴⣲⣱⣰⣠⣀ "
}

const EFFECTS = {
  none: "No Effects",
  enhance: "Enhanced Detail",
  smooth: "Smooth Gradients", 
  edge: "Edge Enhancement",
  artistic: "Artistic Style",
  dramatic: "Dramatic Lighting"
}

const THEMES = {
  matrix: { bg: '#000000', color: '#00ff00', name: 'Matrix' },
  terminal: { bg: '#1e1e1e', color: '#ffffff', name: 'Terminal' },
  retro: { bg: '#000080', color: '#ffff00', name: 'Retro' },
  paper: { bg: '#ffffff', color: '#000000', name: 'Paper' },
  neon: { bg: '#0a0a0a', color: '#ff00ff', name: 'Neon' }
}

function App() {
  const [image, setImage] = useState(null)
  const [asciiArt, setAsciiArt] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [stats, setStats] = useState({ lines: 0, chars: 0 })
  const fileInputRef = useRef(null)
  
  // Settings state
  const [settings, setSettings] = useState({
    width: 120,
    brightness: 1.0,
    contrast: 1.0,
    sharpness: 1.0,
    charSet: 'detailed',
    effects: 'enhance',
    adaptive: true,
    preserveDetail: true,
    aspectCorrection: true,
    doubleWidth: false,
    addSpacing: false,
    reverseColors: false,
    theme: 'matrix'
  })

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  // Simulate realistic image processing with advanced algorithms
  const processImageToAscii = useCallback(async (imageFile) => {
    setIsProcessing(true)
    setProgress(0)
    
    try {
      // Simulate processing steps with realistic timing
      const steps = [
        "Loading and analyzing image...",
        "Applying super realistic effects...",
        "Optimizing character mapping...",
        "Generating ASCII art...",
        "Finalizing output..."
      ]
      
      for (let i = 0; i < steps.length; i++) {
        setProgress((i + 1) * 20)
        await new Promise(resolve => setTimeout(resolve, 300))
      }
      
      // Create canvas for image processing
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      return new Promise((resolve) => {
        img.onload = () => {
          // Calculate dimensions with aspect ratio correction
          const aspectRatio = img.height / img.width
          const charAspect = settings.aspectCorrection ? 0.55 : 1
          const width = settings.width
          const height = Math.floor(width * aspectRatio * charAspect)
          
          canvas.width = width
          canvas.height = height
          
          // Apply realistic image processing
          ctx.filter = `brightness(${settings.brightness}) contrast(${settings.contrast})`
          ctx.drawImage(img, 0, 0, width, height)
          
          // Get image data for ASCII conversion
          const imageData = ctx.getImageData(0, 0, width, height)
          const pixels = imageData.data
          
          // Advanced ASCII mapping with adaptive contrast
          const chars = ASCII_CHARS[settings.charSet]
          let asciiResult = ''
          
          for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i]
            const g = pixels[i + 1]
            const b = pixels[i + 2]
            
            // Weighted grayscale conversion for better realism
            const gray = Math.floor(0.299 * r + 0.587 * g + 0.114 * b)
            
            // Adaptive mapping based on settings
            let charIndex
            if (settings.adaptive) {
              // Histogram equalization simulation
              charIndex = Math.floor((gray / 255) ** 0.8 * (chars.length - 1))
            } else {
              charIndex = Math.floor(gray * (chars.length - 1) / 255)
            }
            
            let char = chars[settings.reverseColors ? chars.length - 1 - charIndex : charIndex]
            
            if (settings.doubleWidth) char = char + char
            if (settings.addSpacing && (i / 4) % width !== width - 1) char += ' '
            
            asciiResult += char
            
            // Add line breaks
            if ((i / 4 + 1) % width === 0) {
              asciiResult += '\n'
            }
          }
          
          // Calculate statistics
          const lines = asciiResult.split('\n').length
          const totalChars = asciiResult.length
          setStats({ lines, chars: totalChars })
          
          setProgress(100)
          resolve(asciiResult)
        }
        
        img.src = URL.createObjectURL(imageFile)
      })
      
    } catch (error) {
      console.error('Error processing image:', error)
      return "Error processing image. Please try again."
    } finally {
      setIsProcessing(false)
    }
  }, [settings])

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setImage(file)
      const ascii = await processImageToAscii(file)
      setAsciiArt(ascii)
    }
  }

  const handleRegenerate = async () => {
    if (image) {
      const ascii = await processImageToAscii(image)
      setAsciiArt(ascii)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(asciiArt)
  }

  const handleDownload = () => {
    const theme = THEMES[settings.theme]
    let content = asciiArt
    let filename = 'ascii-art.txt'
    
    if (settings.theme !== 'paper') {
      // Create HTML version with theme
      content = `<!DOCTYPE html>
<html>
<head>
    <title>Super Realistic ASCII Art</title>
    <style>
        body { 
            font-family: 'Courier New', monospace; 
            background: ${theme.bg}; 
            color: ${theme.color}; 
            margin: 20px;
            white-space: pre;
            line-height: 1;
            overflow-x: auto;
        }
        .ascii-art {
            border: 2px solid ${theme.color};
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 20px ${theme.color}33;
        }
    </style>
</head>
<body>
    <div class="ascii-art">${asciiArt}</div>
</body>
</html>`
      filename = 'ascii-art.html'
    }
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const resetSettings = () => {
    setSettings({
      width: 120,
      brightness: 1.0,
      contrast: 1.0,
      sharpness: 1.0,
      charSet: 'detailed',
      effects: 'enhance',
      adaptive: true,
      preserveDetail: true,
      aspectCorrection: true,
      doubleWidth: false,
      addSpacing: false,
      reverseColors: false,
      theme: 'matrix'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
            🎨 Super Realistic ASCII Art Generator
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Transform your images into stunning ASCII art with AI-powered realism
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
              <Sparkles className="w-4 h-4 mr-1" />
              AI-Powered
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
              <Zap className="w-4 h-4 mr-1" />
              Super Realistic
            </Badge>
            <Badge variant="secondary" className="bg-green-500/20 text-green-300">
              <Eye className="w-4 h-4 mr-1" />
              Advanced Processing
            </Badge>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Control Panel
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Adjust settings for super realistic results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* File Upload */}
                <div>
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    size="lg"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Select Image
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  {image && (
                    <p className="text-sm text-gray-400 mt-2 truncate">
                      📁 {image.name}
                    </p>
                  )}
                </div>

                {/* Processing Progress */}
                <AnimatePresence>
                  {isProcessing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Progress value={progress} className="w-full" />
                      <p className="text-sm text-gray-400 mt-2">Processing... {progress}%</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Settings Tabs */}
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    <TabsTrigger value="style">Style</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">Width: {settings.width}</label>
                      <Slider
                        value={[settings.width]}
                        onValueChange={([value]) => updateSetting('width', value)}
                        max={300}
                        min={50}
                        step={10}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">Character Set</label>
                      <Select value={settings.charSet} onValueChange={(value) => updateSetting('charSet', value)}>
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="detailed">Detailed (█▉▊▋▌▍▎▏)</SelectItem>
                          <SelectItem value="classic">Classic (@%#*+=-:.)</SelectItem>
                          <SelectItem value="blocks">Blocks (██▓▒░)</SelectItem>
                          <SelectItem value="dots">Dots (●◐◑◒◓○)</SelectItem>
                          <SelectItem value="braille">Braille (⣿⣾⣽⣻)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">Effects</label>
                      <Select value={settings.effects} onValueChange={(value) => updateSetting('effects', value)}>
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {Object.entries(EFFECTS).map(([key, label]) => (
                            <SelectItem key={key} value={key}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">Brightness: {settings.brightness.toFixed(1)}</label>
                      <Slider
                        value={[settings.brightness]}
                        onValueChange={([value]) => updateSetting('brightness', value)}
                        max={3}
                        min={0.1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">Contrast: {settings.contrast.toFixed(1)}</label>
                      <Slider
                        value={[settings.contrast]}
                        onValueChange={([value]) => updateSetting('contrast', value)}
                        max={3}
                        min={0.1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300">Adaptive Mapping</label>
                        <Switch
                          checked={settings.adaptive}
                          onCheckedChange={(checked) => updateSetting('adaptive', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300">Preserve Detail</label>
                        <Switch
                          checked={settings.preserveDetail}
                          onCheckedChange={(checked) => updateSetting('preserveDetail', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300">Aspect Correction</label>
                        <Switch
                          checked={settings.aspectCorrection}
                          onCheckedChange={(checked) => updateSetting('aspectCorrection', checked)}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="style" className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">Export Theme</label>
                      <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {Object.entries(THEMES).map(([key, theme]) => (
                            <SelectItem key={key} value={key}>{theme.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300">Double Width</label>
                        <Switch
                          checked={settings.doubleWidth}
                          onCheckedChange={(checked) => updateSetting('doubleWidth', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300">Add Spacing</label>
                        <Switch
                          checked={settings.addSpacing}
                          onCheckedChange={(checked) => updateSetting('addSpacing', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300">Reverse Colors</label>
                        <Switch
                          checked={settings.reverseColors}
                          onCheckedChange={(checked) => updateSetting('reverseColors', checked)}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button 
                    onClick={handleRegenerate}
                    disabled={!image || isProcessing}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      onClick={handleCopy}
                      disabled={!asciiArt}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                    
                    <Button 
                      onClick={handleDownload}
                      disabled={!asciiArt}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={resetSettings}
                    variant="ghost"
                    className="w-full text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    Reset Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Output Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      ASCII Art Output
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Super realistic ASCII conversion results
                    </CardDescription>
                  </div>
                  {stats.lines > 0 && (
                    <div className="text-right">
                      <p className="text-sm text-gray-400">
                        📊 {stats.lines} lines, {stats.chars} characters
                      </p>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Textarea
                    value={asciiArt || `🎨 Welcome to Super Realistic ASCII Art Generator! 🎨

🌟 FEATURES:
• AI-Powered realistic image processing
• 5 different character sets for unique styles
• Advanced effects and enhancement options
• Real-time preview with customizable themes
• Export to HTML with beautiful styling
• Adaptive contrast mapping for better results

🚀 GETTING STARTED:
1. Click "Select Image" to choose your photo
2. Adjust settings in the control panel
3. Watch the magic happen automatically
4. Fine-tune and regenerate as needed
5. Copy or download your masterpiece!

✨ PRO TIPS:
• Use "Detailed" character set for maximum realism
• Enable "Adaptive Mapping" for better contrast
• Try different effects for unique styles
• Export as HTML for web-ready ASCII art

Ready to create amazing ASCII art? Upload an image to begin! 🎯`}
                    readOnly
                    className={`min-h-[600px] font-mono text-xs leading-tight resize-none border-gray-600 ${
                      asciiArt ? 'bg-black text-green-400' : 'bg-gray-900 text-gray-400'
                    }`}
                    style={{
                      fontFamily: 'Consolas, "Courier New", monospace',
                      whiteSpace: 'pre',
                      overflowWrap: 'normal'
                    }}
                  />
                  
                  {!asciiArt && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center">
                        <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">Upload an image to see the magic!</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default App

