import React, { useState, useEffect } from 'react'
import RichTextEditor from 'react-rte'

function EditorField(FieldProps) {
    const [editorState, setEditorState] = useState(RichTextEditor.createEmptyValue())
    useEffect(() => {
        if (
            FieldProps.field.value !== null &&
            typeof FieldProps.field.value !== 'undefined' &&
            FieldProps.field.value !== editorState.toString('html')
        ) {
            setEditorState(RichTextEditor.createValueFromString(FieldProps.field.value, 'html'))
        }
    }, [FieldProps.field.value, editorState.toString('html')])
    return (
        <RichTextEditor
            value={editorState}
            onChange={text => {
                FieldProps.form.setFieldValue(FieldProps.field.name, text.toString('html'))
                setEditorState(text)
            }}
        />
    )
}

export default EditorField
