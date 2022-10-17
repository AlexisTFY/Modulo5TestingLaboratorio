import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import userEvent from '@testing-library/user-event';

const exampleProps = {
  isOpen: true,
  onAccept: () => {},
  onClose: () => {},
  title: 'Eliminar Proyecto',
  labels: {
    closeButton: 'Cancelar',
    acceptButton: 'Aceptar',
  },
};

describe('confirmation-dialog.component spec', () => {
  
    it('should not display a dialog if isOpen is false', () => {
        // Arrange
        const props = { ...exampleProps, isOpen: false };

        // Act
        render(<ConfirmationDialogComponent {...props} />);

        const confirmationDialog = screen.queryByRole('dialog');

        // Assert
        expect(confirmationDialog).toBeNull();
        expect(confirmationDialog).not.toBeInTheDocument();
    });

    it('should display a dialog if isOpen is true', () => {
        // Arrange
        const props = exampleProps;

        // Act
        render(<ConfirmationDialogComponent {...props} />);

        const confirmationDialog = screen.getByRole('dialog');

        // Assert
        expect(confirmationDialog).toBeInTheDocument();
    });
  
    it('should display a dialog with the string title provided in props', () => {
        // Arrange
        const props = exampleProps;

        // Act
        render(<ConfirmationDialogComponent {...props} />);

        const confirmationDialog = screen.getByRole('dialog');
        const title = within(confirmationDialog).getByRole('heading');

        // Assert
        expect(title).toHaveTextContent(props.title);
    });
  
    it('should display a dialog with the non-string title provided in props', () => {
        // Arrange
        const nonStringTitle: React.ReactNode = <a href="#">Título con enlace</a>;

        const props = { ...exampleProps, title: nonStringTitle };

        // Act
        render(<ConfirmationDialogComponent {...props} />);

        // Assert
        const title = screen.getByText('Título con enlace');
        expect(title).toBeInTheDocument();
    });

    it('should display a dialog with the string content', () => {
        // Arrange
        const props = exampleProps;
        const contentWrapped = 'Texto para el contenido';

        // Act
        render(
        <ConfirmationDialogComponent {...props}>
            {contentWrapped}
        </ConfirmationDialogComponent>
        );

        const confirmationDialog = screen.getByRole('dialog');
        const content = within(confirmationDialog).getByText(contentWrapped);

        // Assert
        expect(content).toBeInTheDocument();
    });
  
    it('should display a dialog with the non-string content', () => {
        // Arrange
        const props = exampleProps;
        const text = 'Pulsa aquí para más información';
        const contentWrapped: React.ReactNode = <a href="#">{text}</a>;

        // Act
        render(
        <ConfirmationDialogComponent {...props}>
            {contentWrapped}
        </ConfirmationDialogComponent>
        );

        const confirmationDialog = screen.getByRole('dialog');
        const content = within(confirmationDialog).getByText(text);

        // Assert
        expect(content).toBeInTheDocument();
    });

    it('should display a dialog with the buttons labels provided in props', () => {
        // Arrange
        const props = exampleProps;

        // Act
        render(<ConfirmationDialogComponent {...props} />);

        const confirmationDialog = screen.getByRole('dialog');
        const acceptButton = within(confirmationDialog).getByRole('button', {
        name: new RegExp(props.labels.acceptButton),
        });
        const closeButton = within(confirmationDialog).getByRole('button', {
        name: new RegExp(props.labels.closeButton),
        });

        // Assert
        expect(acceptButton).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();
    });
  
    it('should call onAccept when it clicks on "Aceptar" button', async () => {
        // Arrange
        const props = { ...exampleProps, onAccept: jest.fn() };
        // Act
        render(<ConfirmationDialogComponent {...props} />);

        const confirmationDialog = screen.getByRole('dialog');
        const acceptButton = within(confirmationDialog).getByRole('button', {
        name: new RegExp(props.labels.acceptButton),
        });
        await userEvent.click(acceptButton);

        // Assert
        expect(await props.onAccept).toHaveBeenCalled();
    });
  
    it('should call onClose when it clicks on "Cerrar" button', async () => {
        // Arrange
        const props = { ...exampleProps, onClose: jest.fn() };
        // Act
        render(<ConfirmationDialogComponent {...props} />);

        const confirmationDialog = screen.getByRole('dialog');
        const closeButton = within(confirmationDialog).getByRole('button', {
        name: new RegExp(props.labels.closeButton),
        });
        await userEvent.click(closeButton);

        // Assert
        expect(await props.onClose).toHaveBeenCalled();
    });

});