'use client';

import Theme from './plugins/Theme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import React from 'react';

import { FloatingComposer, FloatingThreads, liveblocksConfig, LiveblocksPlugin, useEditorStatus } from '@liveblocks/react-lexical'
import Loader from '../Loader';

import FloatingToolbarPlugin from './plugins/FloatingToolbarPlugin'
import { useThreads } from '@liveblocks/react/suspense';
import Comments from '../Comments';
import { DeleteModal } from '../DeleteModal';
import { TransportForm } from '../TransportForm';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export interface TimesheetEntry {
  date: string;
  hours: number;
  client: string;
  chantier: string;
  sousTraitant: string;
  plaque: string;
  vehicleType: string;
  totalHeuresSimple: string;
  totalHeuresDouble: string;
  totalVoyageSimple: string;
  totalVoyageDouble: string;
  infoVoyage: string;
  acceptePar: string;
}

export function Editor({ roomId, currentUserType }: { roomId: string, currentUserType: UserType }) {
  const status = useEditorStatus();
  const { threads } = useThreads();

  const initialConfig = liveblocksConfig({
    namespace: 'Editor',
    nodes: [HeadingNode],
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
    theme: Theme,
    editable: currentUserType === 'editor',
  });

  // Custom styles for the editor
  const editorStyles = `
  .editor-input {
    color: #000000 !important;
    caret-color: #000000 !important;
  }
  .editor-input:focus {
    outline: none;
  }
  .editor-paragraph {
    color: inherit !important;
  }
  .transport-form-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffe0; /* Light yellow background */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    pointer-events: none;
  }
  .transport-form-container {
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  `;
  const handleFormSubmit = (formData: any) => {
    // Calculate total hours worked
    const startTime = new Date(`2000-01-01 ${formData.startTime} ${formData.startAmPm.toUpperCase()}`)
    const endTime = new Date(`2000-01-01 ${formData.endTime} ${formData.endAmPm.toUpperCase()}`)
    const hoursWorked = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)

    const newEntry: TimesheetEntry = {
      date: formData.date,
      hours: hoursWorked,
      client: formData.client,
      chantier: formData.chantier,
      sousTraitant: formData.sousTraitant,
      plaque: formData.plaque,
      vehicleType: formData.vehicleType,
      totalHeuresSimple: formData.totalHeuresSimple,
      totalHeuresDouble: formData.totalHeuresDouble,
      totalVoyageSimple: formData.totalVoyageSimple,
      totalVoyageDouble: formData.totalVoyageDouble,
      infoVoyage: formData.infoVoyage,
      acceptePar: formData.acceptePar
    }

    console.log("New entry..", newEntry)

  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <style>{editorStyles}</style>
      <div className="editor-container size-full w-fit">
        <div className="toolbar-wrapper flex w-fit justify-between">
          <ToolbarPlugin />
          {currentUserType === 'editor' && <DeleteModal roomId={roomId} />}
        </div>
        <div className="editor-wrapper flex flex-col items-center justify-start">
          {status === 'not-loaded' || status === 'loading' ? (
            <Loader />
          ) : (
            <div className="editor-inner min-h-[900px] relative mb-5 h-fit w-full max-w-[800px] shadow-md lg:mb-10">
              {/* Yellow background and centered TransportForm */}
              <div className="transport-form-background mt-1">
                <div className="transport-form-container">
                  <TransportForm onSubmit={handleFormSubmit} />
                </div>
              </div>
              
              {/* Editor content */}
              <div className="relative z-10">
                <RichTextPlugin
                  contentEditable={
                    <ContentEditable 
                      className="editor-input h-full bg-transparent p-4" 
                      style={{ color: 'rgb(0, 0, 128)' }}
                    />
                  }
                  placeholder={<Placeholder />}
                  ErrorBoundary={LexicalErrorBoundary}
                />
                {currentUserType === 'editor' && <FloatingToolbarPlugin />}
                <HistoryPlugin />
                <AutoFocusPlugin />
              </div>
            </div>
          )}
          <LiveblocksPlugin>
            <FloatingComposer className="w-[350px]" />
            <FloatingThreads threads={threads} />
            <Comments />
          </LiveblocksPlugin>
        </div>
      </div>
    </LexicalComposer>
  );
}