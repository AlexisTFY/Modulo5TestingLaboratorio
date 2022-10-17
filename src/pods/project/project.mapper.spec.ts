import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { mapProjectFromApiToVm } from './project.mapper';

const emptyProject = {
  comments: '',
  employees: [],
  externalId: '',
  id: '',
  isActive: false,
  name: '',
}

const demoProject: apiModel.Project = {
    id: '1',
    name: 'Projecto Alfa',
    externalId: '01',
    comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    isActive: true,
    employees: [
      { id: '1', isAssigned: true, employeeName: 'Alexis Dominguez Pizarro' },
      { id: '10', isAssigned: false, employeeName: 'Valeria Dominguez Cortez' },
    ],
  };

describe('project.mapper specs', () => {
    it('should return empty array when it feeds null', () => {
        // Arrange
        const project: apiModel.Project = null;

        // Act
        const result: viewModel.Project = mapProjectFromApiToVm(project);

        // Assert
        expect(result).toEqual(emptyProject);
    });

    it('should return empty array when it feeds undefined', () => {
        // Arrange
        const project: apiModel.Project = undefined;

        // Act
        const result: viewModel.Project = mapProjectFromApiToVm(project);

        // Assert
        expect(result).toEqual(emptyProject);
    });

    it('should return a project when it feeds a project with null employees', () => {
        // Arrange
        const project: apiModel.Project = { ...demoProject, employees: null };
    
        // Act
        const result: viewModel.Project = mapProjectFromApiToVm(project);
    
        // Assert
        expect(result).toEqual({ ...demoProject, employees: [] });
    });

    it('should return a project when it feeds a project with undefined employees', () => {
        // Arrange
        const project: apiModel.Project = { ...demoProject, employees: undefined };

        // Act
        const result: viewModel.Project = mapProjectFromApiToVm(project);

        // Assert
        expect(result).toEqual({ ...demoProject, employees: [] });
    });

    it('should return a project when it feeds a project with an empty array of employees', () => {
        // Arrange
        const project: apiModel.Project = { ...demoProject, employees: [] };

        // Act
        const result: viewModel.Project = mapProjectFromApiToVm(project);

        // Assert
        expect(result).toEqual({ ...demoProject, employees: [] });
    });

    it('should return a project when you feed a project with an empty property', () => {
        // Arrange
        const project: apiModel.Project = { ...demoProject, name: '' };

        // Act
        const result: viewModel.Project = mapProjectFromApiToVm(project);

        // Assert
        expect(result).toEqual({ ...demoProject, name: '' });
    });

    it('should return the same project as the demoProject', () => {
        // Arrange
        const project: apiModel.Project = demoProject;

        // Act
        const result: viewModel.Project = mapProjectFromApiToVm(project);

        // Assert
        expect(result).toEqual(demoProject);
    });
});
 