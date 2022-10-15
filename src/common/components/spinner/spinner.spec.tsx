import React from 'react';
import { SpinnerComponent } from './spinner.component';
import { render, screen } from '@testing-library/react';
import * as promiseTracker from 'react-promise-tracker/lib/trackerHook';

describe('spinner.component spec', () => {
  
    it('Should display the modal component with the loader when promiseInProgress is true', () => {
    
        // Arrange
    jest
      .spyOn(promiseTracker, 'usePromiseTracker')
      .mockReturnValue({ promiseInProgress: true });
    
      // Act
    render(<SpinnerComponent />);

    const modal = screen.getByRole('presentation');
    const loader = screen.getByRole('prodialoggressbar');
    // Assert
    console.log(loader);
    expect(modal).toBeInTheDocument();
    expect(loader).toBeInTheDocument();
    
  });

  it('Should not be mount when promiseInProgress is false', () => {
    
    // Arrange
    jest
      .spyOn(promiseTracker, 'usePromiseTracker')
      .mockReturnValue({ promiseInProgress: false });
    
      // Act
    render(<SpinnerComponent />);

    const modal = screen.queryByRole('presentation');
    const loader = screen.queryByRole('progressbar');
    // Assert

    expect(modal).not.toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();
  });

});