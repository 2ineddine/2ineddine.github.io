import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Project from './components/Project';

test('renders the YOLO26 project with the RoadAnomalyDetection GitHub link', () => {
  render(<Project />);

  expect(screen.getByText(/YOLO26 – Pothole and Crack Detection on Roads/i)).toBeInTheDocument();

  const links = screen
    .getAllByRole('link', { name: /GitHub Repository/i })
    .map((link) => link.getAttribute('href'));

  expect(links).toContain('https://github.com/2ineddine/RoadAnomalyDetection');
});

test('clicking a project title expands its details panel', () => {
  render(<Project />);

  const titleButton = screen.getByRole('button', { name: /self-supervised acoustic representation learning for forest soundscapes/i });
  fireEvent.click(titleButton);

  expect(screen.getByText(/Trained the DINO ViT-B\/8 model via self-supervised learning/i)).toBeInTheDocument();
});
