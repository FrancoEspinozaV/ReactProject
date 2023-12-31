import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { AUTO_LENGUAGE } from './constantes'
import { ArrowIcon } from './component/Icons'
import { LanguageSelector } from './component/LanguageSelect'
import { SectionType } from './types.d'
function App() {
  const {
    interChangeLanguage,
    setFromLanguage,
    setToLanguage,
    fromLanguage,
    toLanguage,
  } = useStore()
  return (
    <Container fluid>
      <h1>Google Translate</h1>

      <Row>
        <Col>
          <LanguageSelector
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage}
          />
        </Col>
        <Col>
          <Button
            variant='link'
            disabled={fromLanguage === AUTO_LENGUAGE}
            onClick={interChangeLanguage}
          >
            <ArrowIcon />
          </Button>
        </Col>
        <Col>
          <LanguageSelector
            type={SectionType.To}
            value={toLanguage}
            onChange={setToLanguage}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App
