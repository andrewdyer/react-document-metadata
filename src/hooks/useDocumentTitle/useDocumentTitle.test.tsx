import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { DocumentMetaProvider } from '../../contexts';
import useDocumentTitle from './useDocumentTitle';

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <DocumentMetaProvider>{children}</DocumentMetaProvider>
);

describe('useDocumentTitle', () => {
    test('should set the document title', () => {
        renderHook(() => useDocumentTitle('Base Title'), { wrapper });

        expect(document.title).toBe('Base Title');
    });

    test('should append title suffix to the document title', () => {
        const { result } = renderHook(() => useDocumentTitle('Base Title'), { wrapper });

        act(() => {
            result.current.setDocumentTitleSuffix('Notification');
        });

        expect(document.title).toBe('Base Title - Notification');
    });

    test('should clear the title suffix from the document title', () => {
        const { result } = renderHook(() => useDocumentTitle('Base Title'), { wrapper });

        act(() => {
            result.current.setDocumentTitleSuffix('Notification');
        });

        expect(document.title).toBe('Base Title - Notification');

        act(() => {
            result.current.clearDocumentTitleSuffix();
        });

        expect(document.title).toBe('Base Title');
    });
});
