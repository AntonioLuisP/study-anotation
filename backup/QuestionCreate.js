import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import api from "../src/services/api"

import {
  CButton,
  CCol,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CForm,
  CFormGroup,
  CRow,
} from '@coreui/react'

const QuestionCreate = ({ project }) => {

  const history = useHistory();
  const [id_project, setId_project] = useState('')
  const [question, setQuestion] = useState('')

  useEffect(() => {
    setId_project(project)
  }, [project])

  async function handleCreate(e) {
    e.preventDefault();
    const data = {
      question,
      'id_project': id_project,
    }
    try {
      await api.post('question', data, {})
        .then(response => {
          if (response.status === 200) {
            history.push('/projects/' + id_project)
          }
        })
    } catch (error) {
      alert("erro")
      console.log(error)
    }
  }

  return (
    <CRow>
      <CCol xs="12" md="12" sm="12">
        <CForm onSubmit={handleCreate} className="form-horizontal">
          <CFormGroup row>
            <CCol xl="12" md="12" sm="12">
              <CInputGroup>
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Questão"
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                />
                <CInputGroupAppend>
                  <CButton type="submit" color="success">Salvar</CButton>
                </CInputGroupAppend>
              </CInputGroup>
            </CCol>
          </CFormGroup>
        </CForm>
      </CCol>
    </CRow>
  )
}

export default QuestionCreate



