"use client"

import { useState, useRef, useEffect } from "react"

export default function GitHubDocsLanding() {
  const [repoUrl, setRepoUrl] = useState("")
  const [docContent, setDocContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [error, setError] = useState("")
  const editorRef = useRef(null)

  // Check system preference for dark mode on component mount
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true)
    }
  }, [])

  const handleRepoSubmit = async (e) => {
    e.preventDefault()
    
    // Validate input
    if (!repoUrl) {
      setError("Please enter a GitHub repository URL")
      return
    }
    
    setIsLoading(true)
    setError("")
    
    try {
      // Send request to localhost:5000/generate
      const response = await fetch('https://code-doc-1.onrender.com/api/docs/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repoUrl }),
      })
      
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`)
      }
      
      const data = await response.json()
      setDocContent(data.documentation || "# Documentation could not be generated")
      
    } catch (err) {
      console.error("Error fetching documentation:", err)
      setError("Failed to generate documentation. Please try again.")
      // Show some example content for demo purposes
      setDocContent(
        `# Documentation for ${repoUrl}\n\nStart writing your documentation here...\n\n## Features\n\n- Feature one\n- Feature two\n- Feature three\n\n## Installation\n\n\`\`\`bash\nnpm install my-package\n\`\`\`\n\n## Usage\n\n\`\`\`javascript\nimport { myFunction } from 'my-package';\n\n// Use the function\nmyFunction();\n\`\`\``,
      )
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen w-full md:w-[1530px] mt-0 md:mt-[-30px] mx-auto md:ml-[-157px] mb-0 md:mb-[-120px] px-4 sm:px-6 lg:px-8 ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="12" fill={isDarkMode ? "#222" : "#000"} />
                <path d="M14 14L26 14L26 26L14 26L14 14Z" stroke={isDarkMode ? "#f472b6" : "#ec4899"} strokeWidth="2" />
                <path d="M20 14V26" stroke={isDarkMode ? "#f472b6" : "#ec4899"} strokeWidth="2" />
                <path d="M14 20H26" stroke={isDarkMode ? "#f472b6" : "#ec4899"} strokeWidth="2" />
              </svg> */}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
              CoDe
              <span className={isDarkMode ? "text-white" : "text-black"}>HuB</span>
            </h1>
          </div>
          <button 
            onClick={toggleTheme} 
            className="transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-pink-400 sm:w-6 sm:h-6"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-pink-600 sm:w-6 sm:h-6"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
        </header>

        {/* Hero Section */}
        <section className="text-center my-8 sm:my-16 relative max-w-4xl mx-auto px-4">
          <div className="absolute inset-0 -z-10">
            <div className={`absolute inset-0 bg-gradient-to-r ${isDarkMode ? "from-pink-900/20 to-black/30" : "from-pink-100 to-pink-50"} rounded-3xl blur-3xl opacity-30`}></div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
            Document Your GitHub Projects <span className="text-pink-600 dark:text-pink-400">Effortlessly</span>
          </h2>
          
          {/* Beta Banner */}
          <div className={`inline-block mx-auto mb-6 py-1 px-4 rounded-full text-xs sm:text-sm font-medium ${
            isDarkMode ? "bg-pink-900/50 text-pink-200 border border-pink-800" : "bg-pink-100 text-pink-800 border border-pink-200"
          }`}>
            <span className="inline-flex items-center">
              <span className={`w-2 h-2 rounded-full mr-2 ${isDarkMode ? "bg-pink-400" : "bg-pink-500"} animate-pulse`}></span>
              ONE FILE AT A TIME — BETA VERSION
            </span>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create beautiful documentation for your repositories in minutes. Just paste your GitHub link and start
            writing.
          </p>
        </section>

        {/* GitHub Input */}
        <section className="max-w-3xl mx-auto mb-8 sm:mb-16 px-4">
          <div className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-xl shadow-lg border p-4 sm:p-6`}>
            <form onSubmit={handleRepoSubmit}>
              <div className="space-y-4">
                <label htmlFor="repo-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  GitHub Repository URL
                </label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                  <input
                    id="repo-url"
                    type="text"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/username/repository"
                    className={`flex-grow px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none border ${isDarkMode ? "bg-gray-900 border-gray-700 text-gray-100" : "bg-white border-gray-300 text-gray-900"} focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors`}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 sm:px-5 py-2 sm:py-3 bg-pink-600 hover:bg-pink-700 text-black font-medium rounded-lg sm:rounded-l-none sm:rounded-r-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : "Get Docs"}
                  </button>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            </form>
          </div>
        </section>

        {/* Documentation Editor Preview */}
        {docContent && (
          <section className="max-w-5xl mx-auto mb-8 sm:mb-16 px-4 transition-all">
            <div className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-xl shadow-lg border overflow-hidden`}>
              <div className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 ${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"} border-b`}>
                <div className="flex space-x-2 mr-4">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-mono">README.md</div>
              </div>
              <div className="p-4 sm:p-6">
                <textarea
                  ref={editorRef}
                  value={docContent}
                  onChange={(e) => setDocContent(e.target.value)}
                  className={`w-full min-h-[300px] sm:min-h-[400px] p-3 sm:p-4 rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-900"} font-mono text-xs sm:text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors`}
                />
              </div>
            </div>
          </section>
        )}

        {/* Features */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 my-8 sm:my-16 px-4">
          <div className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-xl p-4 sm:p-6 shadow-md border transition-all hover:shadow-lg hover:-translate-y-1`}>
            <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg ${isDarkMode ? "bg-pink-900/30 text-pink-400" : "bg-pink-100 text-pink-600"} mb-4`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sm:w-6 sm:h-6"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Fast & Simple</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Create documentation in seconds with our intuitive editor.</p>
          </div>

          <div className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-xl p-4 sm:p-6 shadow-md border transition-all hover:shadow-lg hover:-translate-y-1`}>
            <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg ${isDarkMode ? "bg-pink-900/30 text-pink-400" : "bg-pink-100 text-pink-600"} mb-4`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sm:w-6 sm:h-6"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Markdown Support</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Full markdown support with live preview as you type.</p>
          </div>

          <div className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-xl p-4 sm:p-6 shadow-md border transition-all hover:shadow-lg hover:-translate-y-1`}>
            <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg ${isDarkMode ? "bg-pink-900/30 text-pink-400" : "bg-pink-100 text-pink-600"} mb-4`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sm:w-6 sm:h-6"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">GitHub Integration</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Seamlessly connect with your GitHub repositories.</p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center my-10 sm:my-20 max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Ready to document your projects?</h2>
          <button className="bg-pink-600 hover:bg-pink-700 text-black mb-4 font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
            Get Started — It's Free
          </button>
        </section>
      </div>
    </div>
  )
}