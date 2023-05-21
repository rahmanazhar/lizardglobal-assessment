import React from 'react';
import ListComponent from '../Lists/ListComponent';
import '../App.css'; 

import translations from '../../common/translations/translations';

function Main(): JSX.Element {
    const { appTitle, postListTitle, footerText } = translations.en;

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="app-title">{appTitle}</h1>
      </header>
      <main className="main-content">
        <ListComponent endpoint="/api/posts" title={postListTitle} />
      </main>
      <footer className="footer">
        <p>{footerText}</p>
      </footer>
    </div>
  );
}

export default Main;
