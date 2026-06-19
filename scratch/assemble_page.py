import re

def main():
    temp_path = r"c:\Users\ADMIN\Downloads\next-js-website - Copy (1)\next-js-website - Copy\styles\temp_jsx_body.txt"
    output_page_path = r"c:\Users\ADMIN\Downloads\next-js-website - Copy (1)\next-js-website - Copy\app\page.js"
    
    with open(temp_path, "r", encoding="utf-8") as f:
        jsx_body = f.read()
        
    # Replace FAQ 1
    faq1_target = """                    <div className="faq-item">
                        <button type="button" className="faq-trigger" aria-expanded="false">
                            <span className="faq-question">What types of phishing simulations can InSAT run?</span>"""
    
    faq1_replacement = """                    <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
                        <button type="button" className="faq-trigger" aria-expanded={activeFaq === 0} onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}>
                            <span className="faq-question">What types of phishing simulations can InSAT run?</span>"""
    
    jsx_body = jsx_body.replace(faq1_target, faq1_replacement)
    
    # Replace FAQ 2
    faq2_target = """                    <div className="faq-item">
                        <button type="button" className="faq-trigger" aria-expanded="false">
                            <span className="faq-question">Can training be assigned role-wise?</span>"""
                            
    faq2_replacement = """                    <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                        <button type="button" className="faq-trigger" aria-expanded={activeFaq === 1} onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}>
                            <span className="faq-question">Can training be assigned role-wise?</span>"""
                            
    jsx_body = jsx_body.replace(faq2_target, faq2_replacement)
    
    # Replace FAQ 3
    faq3_target = """                    <div className="faq-item">
                        <button type="button" className="faq-trigger" aria-expanded="false">
                            <span className="faq-question">Does InSAT provide audit-ready compliance evidence?</span>"""
                            
    faq3_replacement = """                    <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
                        <button type="button" className="faq-trigger" aria-expanded={activeFaq === 2} onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}>
                            <span className="faq-question">Does InSAT provide audit-ready compliance evidence?</span>"""
                            
    jsx_body = jsx_body.replace(faq3_target, faq3_replacement)
    
    # Replace FAQ 4
    faq4_target = """                    <div className="faq-item">
                        <button type="button" className="faq-trigger" aria-expanded="false">
                            <span className="faq-question">Can learning paths adapt based on user risk?</span>"""
                            
    faq4_replacement = """                    <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
                        <button type="button" className="faq-trigger" aria-expanded={activeFaq === 3} onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}>
                            <span className="faq-question">Can learning paths adapt based on user risk?</span>"""
                            
    jsx_body = jsx_body.replace(faq4_target, faq4_replacement)
    
    # Replace testimonials slider wrapper
    jsx_body = jsx_body.replace(
        '<div className="slider-wrapper" id="sliderWrapper">',
        '<div className="slider-wrapper" ref={sliderWrapperRef}>'
    )
    
    # Replace slider prev button
    prev_target = """                        <button type="button" className="slider-btn prev" id="sliderPrevBtn" aria-label="Previous Slide">"""
    prev_replacement = """                        <button type="button" className="slider-btn prev" id="sliderPrevBtn" aria-label="Previous Slide" disabled={prevDisabled} onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}>"""
    jsx_body = jsx_body.replace(prev_target, prev_replacement)
    
    # Replace slider next button
    next_target = """                        <button type="button" className="slider-btn next" id="sliderNextBtn" aria-label="Next Slide">"""
    next_replacement = """                        <button type="button" className="slider-btn next" id="sliderNextBtn" aria-label="Next Slide" disabled={nextDisabled} onClick={() => currentIndex < 3 && setCurrentIndex(currentIndex + 1)}>"""
    jsx_body = jsx_body.replace(next_target, next_replacement)
    
    # Construct complete React component file
    react_code = f"""\"use client\";

import React, {{ useState, useEffect, useRef }} from "react";
import Link from "next/link";
import "../styles/insat.scss";

const Home = () => {{
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Testimonials Slider state & refs
  const sliderWrapperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  
  const updateSlider = () => {{
    const wrapper = sliderWrapperRef.current;
    if (!wrapper) return;
    const slides = wrapper.children;
    if (slides.length === 0) return;
    
    const spacing = 12;
    let offset = 0;
    for (let i = 0; i < currentIndex; i++) {{
      offset += slides[i].offsetWidth + spacing;
    }}
    wrapper.style.transform = `translate3d(${{-offset}}px, 0, 0)`;
    
    setPrevDisabled(currentIndex === 0);
    
    const containerWidth = wrapper.parentElement.offsetWidth;
    let totalRemainingWidth = 0;
    for (let i = currentIndex + 1; i < slides.length; i++) {{
      totalRemainingWidth += slides[i].offsetWidth + spacing;
    }}
    setNextDisabled(totalRemainingWidth <= containerWidth);
  }};
  
  useEffect(() => {{
    updateSlider();
    const handleResize = () => updateSlider();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }}, [currentIndex]);
  
  return (
    <div className="insat-page">
      <main>
        {jsx_body}
      </main>
    </div>
  );
}};

export default Home;
"""
    
    with open(output_page_path, "w", encoding="utf-8") as f:
        f.write(react_code)
        
    print("app/page.js assembled successfully.")

if __name__ == "__main__":
    main()
