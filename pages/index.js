import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import path from 'path'
import fs from 'fs'

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'faq-data.json')
  const faqData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  return { props: { faqData } }
}

export default function Home({ faqData }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showClearBtn, setShowClearBtn] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const searchInputRef = useRef(null)

  // Handle search input
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowClearBtn(value.length > 0)
  }

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('')
    setShowClearBtn(false)
    searchInputRef.current?.focus()
  }

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.nav-dropdown')) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Scroll to section
  const scrollToSection = (categoryId) => {
    setDropdownOpen(false)
    const section = document.getElementById(`section-${categoryId}`)
    if (section) {
      const navHeight = 80
      const targetPosition = section.offsetTop - navHeight
      window.scrollTo({ top: targetPosition, behavior: 'smooth' })
    }
  }

  // Scroll to top
  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Filter questions
  const getFilteredCategories = () => {
    if (!faqData) return []

    return faqData.categories.map(category => ({
      ...category,
      questions: category.questions.filter(q =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(cat => cat.questions.length > 0)
  }

  const filteredCategories = getFilteredCategories()
  const hasResults = filteredCategories.length > 0

  return (
    <>
      <Head>
        <title>Design System FAQ</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-container">
          <a href="#top" className="logo" onClick={scrollToTop}>
            <svg width="142" height="32" viewBox="0 0 1290.93 290" xmlns="http://www.w3.org/2000/svg" aria-label="Banqup">
              <style>{`.logo-fill { fill: #4e46e5; }`}</style>
              <g>
                <path className="logo-fill" d="M214.41,76.64c-2.48-3.6-7.67-3.6-10.13,0l-41.98,61.2c-2.89,4.22.05,10.04,5.07,10.04h83.95c5.02,0,7.96-5.82,5.06-10.04l-41.97-61.2Z"/>
                <path className="logo-fill" d="M149.62,171.36c-2.48-3.6-7.67-3.6-10.13,0l-41.98,61.2c-2.89,4.22.05,10.04,5.07,10.04h83.95c5.02,0,7.96-5.82,5.06-10.04l-41.97-61.2Z"/>
                <path className="logo-fill" d="M279.03,171.36c-2.48-3.6-7.67-3.6-10.13,0l-41.98,61.2c-2.89,4.22.05,10.04,5.07,10.04h83.95c5.02,0,7.96-5.82,5.06-10.04l-41.97-61.2Z"/>
                <path className="logo-fill" d="M214.41,230.54c-2.48,3.6-7.67,3.6-10.13,0l-41.98-61.2c-2.89-4.22.05-10.04,5.07-10.04h83.95c5.02,0,7.96,5.82,5.06,10.04l-41.97,61.2Z"/>
              </g>
              <g>
                <path className="logo-fill" d="M985.37,218.63c11.25,0,21.33-7.11,26.26-19.37v-66.58c0-6.38,5.15-11.54,11.54-11.54h6.89c6.38,0,11.53,5.15,11.53,11.54v98.49c0,6.38-5.15,11.54-11.53,11.54h-6.89c-6.38,0-11.54-5.15-11.54-11.54v-6.72c-7.39,10.81-18.93,18.42-35.84,18.42-25.53,0-43.73-12.71-43.73-45.86v-64.34c0-6.38,5.15-11.54,11.53-11.54h6.94c6.33,0,11.48,5.15,11.48,11.54v59.19c0,18.64,8.85,26.77,23.35,26.77"/>
                <path className="logo-fill" d="M700.08,145.38c-11.25,0-21.33,7.11-26.26,19.37v66.58c0,6.38-5.15,11.54-11.54,11.54h-6.89c-6.38,0-11.53-5.15-11.53-11.54v-98.49c0-6.38,5.15-11.54,11.53-11.54h6.89c6.38,0,11.54,5.15,11.54,11.54v6.72c7.39-10.81,18.93-18.42,35.84-18.42,25.53,0,43.73,12.71,43.73,45.86v64.34c0,6.38-5.15,11.54-11.53,11.54h-6.94c-6.33,0-11.48-5.15-11.48-11.54v-59.19c0-18.64-8.85-26.77-23.35-26.77"/>
                <path className="logo-fill" d="M537.97,203.71c0,10.36,9.07,15.51,17.92,15.51,7.39,0,13.05-2.24,21.84-8.62l6.16-3.92.23-26.99-22.06,5.88c-16.69,4.42-24.08,8.57-24.08,18.14M582.87,230.25c-10.75,8.85-20.83,12.99-33.37,12.99-21.62,0-41.49-14.22-41.49-37.8,0-20.89,14-31.41,42.5-39.03l33.6-8.62c-1.23-11.25-10.02-12.12-23.07-12.12-8.23,0-16.29,2.54-21.32,8.69-3.18,3.89-6.55,4.97-11.87,5.41-2.35.19-5.04.02-6.89-.35-1.56-.32-3.31-1.19-4.6-2.13-5.15-3.77-5.29-10.64-2.05-15.24,9.97-14.11,28.36-20.91,48.47-20.91,30.18,0,50.56,11.48,50.56,41.21v68.98c0,6.38-5.15,11.54-11.48,11.54h-5.99c-6.33,0-11.48-6.97-11.48-13.35v-.5l-1.51,1.23Z"/>
                <path className="logo-fill" d="M457.78,181.95c0-24.3-13.05-35.89-29-35.89-14.95,0-28.22,9.41-28.5,29.06v13.72c.28,18.65,13.24,28.55,28.98,28.55s28.53-11.36,28.53-35.44M381.85,242.14c-6.38,0-11.53-5.15-11.53-11.53V85.41c0-6.33,5.15-11.48,11.53-11.48h6.94c6.33,0,11.48,5.15,11.48,11.48v45.75c7.9-7.62,19.43-9.99,33.15-9.99,29.73,0,54.76,20.01,54.76,60.77s-25.03,60.65-54.48,60.65c-15.01,0-25.35-3.2-33.41-12.27v.28c0,6.38-5.15,11.53-11.53,11.53h-6.91Z"/>
                <path className="logo-fill" d="M810.22,181.93c0,24.3,13.05,35.89,29,35.89,14.95,0,28.22-9.41,28.5-29.06v-13.72c-.28-18.65-13.24-28.55-28.98-28.55s-28.53,11.36-28.53,35.44M886.15,121.74c6.38,0,11.53,5.15,11.53,11.53v145.19c0,6.33-5.15,11.48-11.53,11.48h-6.94c-6.33,0-11.48-5.15-11.48-11.48v-45.75c-7.9,7.62-19.43,9.99-33.15,9.99-29.73,0-54.76-20.01-54.76-60.77s25.03-60.65,54.48-60.65c15.01,0,25.35,3.2,33.41,12.27v-.28c0-6.38,5.15-11.53,11.53-11.53h6.91Z"/>
                <path className="logo-fill" d="M1164.16,181.93c0,24.3-13.05,35.89-29,35.89-14.95,0-28.22-9.41-28.5-29.06v-13.72c.28-18.65,13.24-28.55,28.98-28.55s28.53,11.36,28.53,35.44M1088.23,121.74c-6.38,0-11.53,5.15-11.53,11.53v145.19c0,6.33,5.15,11.48,11.53,11.48h6.94c6.33,0,11.48-5.15,11.48-11.48v-45.75c7.9,7.62,19.43,9.99,33.15,9.99,29.73,0,54.76-20.01,54.76-60.77s-25.03-60.65-54.48-60.65c-15.01,0-25.35,3.2-33.41,12.27v-.28c0-6.38-5.15-11.53-11.53-11.53h-6.91Z"/>
              </g>
            </svg>
          </a>

          {/* Search in Nav */}
          <div className="nav-search">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                className="search-input"
                placeholder="Search questions..."
                aria-label="Search FAQ questions"
                autoComplete="off"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                className="search-clear"
                aria-label="Clear search"
                style={{ display: showClearBtn ? 'flex' : 'none' }}
                onClick={handleClearSearch}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="nav-dropdown">
            <button className="nav-dropdown-toggle" onClick={toggleDropdown} aria-label="Toggle categories menu">
              <span>Jump to Section</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="dropdown-chevron">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className={`nav-dropdown-menu ${dropdownOpen ? 'active' : ''}`}>
              {faqData?.categories.map(category => (
                <button
                  key={category.id}
                  className="dropdown-item"
                  onClick={() => scrollToSection(category.id)}
                >
                  <div className="dropdown-item-title">{category.title}</div>
                  <div className="dropdown-item-description">{category.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="page-title-container">
        <h1 className="page-title">Design System onboarding FAQ</h1>
      </div>

      <div className="container">
        {hasResults ? (
          <main className="faq-content">
            {filteredCategories.map(category => (
              <CategorySection key={category.id} category={category} searchQuery={searchQuery} />
            ))}
          </main>
        ) : (
          <div className="no-results">
            <p>No questions found matching your search.</p>
            <button onClick={handleClearSearch} className="clear-search-btn">Clear search</button>
          </div>
        )}
      </div>
    </>
  )
}

function CategorySection({ category, searchQuery }) {
  return (
    <section className="category-section" id={`section-${category.id}`}>
      <h2 className="category-header">
        <span className="category-title">{category.title}</span>
      </h2>
      <div className="questions-container">
        {category.questions.map(question => (
          <QuestionItem key={question.id} question={question} searchQuery={searchQuery} />
        ))}
      </div>
    </section>
  )
}

function QuestionItem({ question, searchQuery }) {
  const [expanded, setExpanded] = useState(false)

  const highlightText = (text) => {
    if (!searchQuery) return text
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i}>{part}</mark> : part
    )
  }

  const formatAnswer = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>')
  }

  return (
    <div className={`question-item ${expanded ? 'expanded' : ''}`} id={`q-${question.id}`}>
      <div className="question-header" onClick={() => setExpanded(!expanded)}>
        <h3 className="question-text">{highlightText(question.question)}</h3>
        <div className="expand-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="icon-plus" d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path className="icon-minus" d="M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      <div className="answer">
        <div className="answer-content">
          <div
            className="answer-content-inner"
            dangerouslySetInnerHTML={{ __html: question.answer ? formatAnswer(question.answer) : '<span class="no-answer">Answer coming soon...</span>' }}
          />
        </div>
      </div>
    </div>
  )
}
