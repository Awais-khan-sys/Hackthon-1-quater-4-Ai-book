import React from 'react';
import clsx from 'clsx';
import styles from './ExerciseBox.module.css';

interface Props {
  title?: string;
  children: React.ReactNode;
}

const ExerciseBox: React.FC<Props> = ({ title = "Exercise", children }) => {
  return (
    <div className={clsx('exercise-box', styles.exerciseBox)}>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default ExerciseBox;