import { FunctionComponent, ReactNode, useState } from "react";
import styles from "./TabbedView.module.scss";

// interface TabTitle {
//   title: string;
//   key: string;
//   tabIndex: string;
// }

// interface TabContent {
//   content: ReactNode;
//   tabIndex: string;
// }

interface TabbedViewProps {
  tabs: TabProps[];
  defaultKey?: string | number;
}

const TabbedView: FunctionComponent<TabbedViewProps> = ({
  tabs,
  defaultKey
}) => {
  const [currentTabKey, setCurrentTabKey] = useState(
    defaultKey || tabs[0].tabKey || ""
  );

  const displayedTab = tabs.find(({ tabKey }) => currentTabKey === tabKey);

  return (
    <section className={styles["tabs-wrapper"]}>
      <div className={styles["tab-list"]} role="tablist">
        {tabs.map(({ tabKey, tabTitle }) => (
          <div
            role="tab"
            onClick={() => setCurrentTabKey(tabKey)}
            className={[
              styles.tab,
              tabKey === currentTabKey && styles.active
            ].join(" ")}
            key={tabKey}
            id={String(tabKey)}
          >
            {tabTitle}
          </div>
        ))}
      </div>
      <div className={styles["tab-panel"]} role="tabpanel">
        {displayedTab?.tabContent || ""}
      </div>
    </section>
  );
};

export interface TabProps {
  tabKey: string | number;
  tabTitle: string;
  tabContent: ReactNode;
}

export default TabbedView;
