import { act, renderHook } from '@testing-library/react-hooks';
import { Lookup } from 'common/models';
import { useConfirmationDialog } from './confirmation-dialog.hook';

describe('useConfirmationDialog specs', () => {
  
    it('Should return an object with the isOpen property set to false when the hook is called', () => {
        // Arrange

        // Act
        const { result } = renderHook(() => useConfirmationDialog());

        // Assert
        expect(result.current.isOpen).toEqual(false);
    });

    it('Should return an object with property itemToDelete with default values when the hook is called', () => {
        // Arrange
        const defaultItemToDelete: Lookup = { id: '', name: '' };

        // Act
        const { result } = renderHook(() => useConfirmationDialog());

        // Assert
        expect(result.current.itemToDelete).toEqual(defaultItemToDelete);
    });

    it('Should return an object with onAccept, onClose and onOpenDialog functions when the hook is called', () => {
        // Arrange

        // Act
        const { result } = renderHook(() => useConfirmationDialog());

        // Assert
        expect(result.current.onAccept).toEqual(expect.any(Function));
        expect(result.current.onClose).toEqual(expect.any(Function));
        expect(result.current.onOpenDialog).toEqual(expect.any(Function));
    });

    it('Should set isOpen to true and itemToDelete to current item when it calls onOpenDialog', () => {
        // Arrange
        const item: Lookup = { id: '01 ', name: 'name' };

        // Act
        const { result } = renderHook(() => useConfirmationDialog());
        act(() => {
        result.current.onOpenDialog(item);
        });

        // Assert
        expect(result.current.isOpen).toEqual(true);
        expect(result.current.itemToDelete).toEqual(item);
    });

    it('Should delete the itemToDelete when it calls onAccept', () => {
        // Arrange
        const item: Lookup = { id: '01 ', name: 'name' };
        const emptyLookup: Lookup = { id: '', name: '' };

        // Act
        const { result } = renderHook(() => useConfirmationDialog());
        act(() => {
        result.current.onOpenDialog(item);
        result.current.onAccept();
        });

        // Assert
        expect(result.current.itemToDelete).toEqual(emptyLookup);
    });

    it('Should set the isOpen to false when it calls onClose and yhe itemToDelete must reamin as same', () => {
        // Arrange
        const item: Lookup = { id: '01 ', name: 'name' };

        // Act
        const { result } = renderHook(() => useConfirmationDialog());
        act(() => {
        result.current.onOpenDialog(item);
        result.current.onClose();
        });

        // Assert
        expect(result.current.isOpen).toEqual(false);
        expect(result.current.itemToDelete).toEqual(item);
    });

});