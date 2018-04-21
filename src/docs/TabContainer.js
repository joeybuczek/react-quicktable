import React from "react";

// Styles
let tabAnchorStyle = { cursor: "pointer" };
let childDivStyle = { paddingTop: 10 };

// Tab Component
const Tab = props => <div style={props.style}>{props.children}</div>;

// TabContainer Component
class TabContainer extends React.Component {
  static Tab = Tab;
  state = { activeTab: this.props.initialTab || 0 };

  setActiveTab(activeTab) {
    this.setState({ activeTab });
  }

  render() {
    let { style, activeTabClass, activeTabStyle, children } = this.props;

    // Create clickable tabs
    let tabs = React.Children.map(children, (child, index) => {
      // ingore nulls for conditionally rendering tabs
      if (!!child) {
        let isActive = index === this.state.activeTab;
        return (
          <li
            key={index}
            role="presentation"
            className={isActive ? "active" : ""}
          >
            <a
              className={isActive ? activeTabClass || "activeTab" : ""}
              id={`tab-container-tab-${index}`}
              style={{
                ...tabAnchorStyle,
                ...(isActive ? activeTabStyle : {})
              }}
              onClick={() => this.setActiveTab.call(this, index)}
            >
              {child.props.name}
            </a>
          </li>
        );
      }
    });

    // Only show active tab's content
    let activeContent = React.Children.map(children, (child, index) => {
      if (!!child && index === this.state.activeTab) return child;
    });

    return (
      <div>
        <ul className="nav nav-tabs">{tabs}</ul>
        <div style={{ ...childDivStyle, ...style }}>{activeContent}</div>
      </div>
    );
  }
}

export default TabContainer;