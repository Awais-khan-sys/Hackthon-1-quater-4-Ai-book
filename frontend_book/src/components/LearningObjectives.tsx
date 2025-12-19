import React from 'react';
import clsx from 'clsx';
import styles from './LearningObjectives.module.css';

interface Props {
  children: React.ReactNode;
}

const LearningObjectives: React.FC<Props> = ({ children }) => {
  return (
    <div className={clsx('learning-objectives', styles.learningObjectives)}>
      <h3>Learning Objectives</h3>
      <ul>{children}</ul>
    </div>
  );
};

export default LearningObjectives;