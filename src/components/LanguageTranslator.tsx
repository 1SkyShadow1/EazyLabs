
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Languages } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'af', name: 'Afrikaans', flag: '🇿🇦' }
];

export const LanguageTranslator = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [originalTexts, setOriginalTexts] = useState<Map<Element, string>>(new Map());

  const translateContent = async (targetLanguage: string) => {
    if (targetLanguage === currentLanguage) return;
    
    setIsTranslating(true);
    
    try {
      // Get translatable elements (excluding currency and technical elements)
      const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p:not(.no-translate p), span:not(.no-translate span), a:not(.no-translate a), button:not(.no-translate button)');
      
      // Store original texts if not already stored
      if (originalTexts.size === 0) {
        const newOriginalTexts = new Map();
        elements.forEach(element => {
          if (element.textContent && 
              element.textContent.trim() && 
              !element.closest('.no-translate') && 
              element.children.length === 0 &&
              !element.textContent.includes('₿') &&
              !element.textContent.includes('$') &&
              !element.textContent.includes('€') &&
              !element.textContent.includes('£') &&
              !element.textContent.includes('R') &&
              !element.textContent.includes('%') &&
              element.textContent.length > 2) {
            newOriginalTexts.set(element, element.textContent.trim());
          }
        });
        setOriginalTexts(newOriginalTexts);
      }

      // Translate elements using Google Translate API
      for (const [element, originalText] of originalTexts.entries()) {
        if (element && element.parentNode) {
          try {
            const translatedText = await translateWithGoogle(originalText, targetLanguage);
            element.textContent = translatedText;
          } catch (error) {
            console.error('Translation error for text:', originalText, error);
            // Fallback to original text if translation fails
            element.textContent = originalText;
          }
        }
      }
      
      setCurrentLanguage(targetLanguage);
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const translateWithGoogle = async (text: string, targetLang: string): Promise<string> => {
    // Return original text if translating back to English
    if (targetLang === 'en') {
      // Find original English text
      for (const [element, originalText] of originalTexts.entries()) {
        if (element.textContent === text) {
          return originalText;
        }
      }
      return text;
    }
    
    try {
      // Using Google Translate API through a CORS proxy
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Translation API request failed');
      }
      
      const data = await response.json();
      
      if (data.responseStatus === 200 && data.responseData) {
        return data.responseData.translatedText;
      } else {
        throw new Error('Translation failed');
      }
    } catch (error) {
      console.error('Google Translate API error:', error);
      // Fallback to LibreTranslate API
      try {
        const response = await fetch('https://libretranslate.com/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: text,
            source: 'en',
            target: targetLang,
            format: 'text'
          })
        });
        
        if (!response.ok) {
          throw new Error('LibreTranslate API request failed');
        }
        
        const data = await response.json();
        return data.translatedText || text;
      } catch (fallbackError) {
        console.error('Fallback translation failed:', fallbackError);
        return `[${targetLang.toUpperCase()}] ${text}`;
      }
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Languages className="text-green-400" size={18} />
      <Select value={currentLanguage} onValueChange={translateContent}>
        <SelectTrigger className="w-[140px] bg-black/60 border-green-400/30 text-green-300 font-mono">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-black/90 border-green-400/30">
          {languages.map((lang) => (
            <SelectItem 
              key={lang.code} 
              value={lang.code}
              className="text-green-300 hover:bg-green-400/20 font-mono"
            >
              <span className="flex items-center space-x-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isTranslating && (
        <div className="text-green-400 text-sm font-mono">Translating...</div>
      )}
    </div>
  );
};
