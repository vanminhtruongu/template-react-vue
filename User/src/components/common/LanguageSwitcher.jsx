import { useTranslation } from 'react-i18next';
import { Dropdown } from 'primereact/dropdown';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
  ];

  const selectedLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.value.code);
  };

  const languageOptionTemplate = (option) => {
    return (
      <div className="flex items-center gap-2">
        <span className="text-lg">{option.flag}</span>
        <span>{option.name}</span>
      </div>
    );
  };

  const selectedLanguageTemplate = (option, props) => {
    if (option) {
      return languageOptionTemplate(option);
    }
    return props.placeholder;
  };

  return (
    <Dropdown
      value={selectedLanguage}
      options={languages}
      onChange={changeLanguage}
      optionLabel="name"
      valueTemplate={selectedLanguageTemplate}
      itemTemplate={languageOptionTemplate}
      className="w-[150px]"
    />
  );
};

export default LanguageSwitcher; 