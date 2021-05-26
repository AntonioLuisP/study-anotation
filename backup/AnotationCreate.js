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
  CSelect
} from '@coreui/react'

const AnotationCreate = ({ question }) => {
  const history = useHistory();

  const [id, setId] = useState('')
  const [anotation, setAnotation] = useState('')
  const [type, setType] = useState('Certeza')
  const [id_question, setId_question] = useState(4)

  useEffect(() => {
    setId_question(question)
  }, [question])

  async function handleCreate(e) {
    e.preventDefault();
    const data = {
      anotation,
      type,
      'id_question': id_question,
    }
    try {
      await api.post('anotation', data, {})
        .then(response => {
          if (response.status === 200) {
            setId(response.data.id)
            history.push("/anotations/" + id)
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
                  placeholder="Anotação"
                  value={anotation}
                  onChange={e => setAnotation(e.target.value)}
                />
                <CInputGroupAppend>
                  <CSelect value={type} onChange={e => setType(e.target.value)} custom name="select" id="select">
                    <option value="Certeza">Certeza</option>
                    <option value="Dúvida">Dúvida</option>
                  </CSelect>
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

export default AnotationCreate



