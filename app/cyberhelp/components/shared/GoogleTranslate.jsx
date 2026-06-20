"use client";
import React, { useEffect } from 'react';

const GoogleTranslate = () => {
    useEffect(() => {
        // Prevent adding multiple script tags if the component re-mounts
        if (!document.querySelector('#google-translate-script')) {
            const addScript = document.createElement('script');
            addScript.id = 'google-translate-script';
            addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
            document.body.appendChild(addScript);

            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: 'en,hi,mr',
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
                    },
                    'google_translate_element'
                );
            };
        }
    }, []);

    return <div id="google_translate_element" className="google-translate-container"></div>;
};

export default GoogleTranslate;
