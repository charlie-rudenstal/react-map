import React from 'react';
import ComponentList from './ComponentList';
import styles from './RootPage.less';

function Root({children}) {
  return (
    <div>
      <div>
        <ComponentList />
      </div>
      <div className={styles.mainContent}>{children}</div>
    </div>
  );
}

export default Root;
