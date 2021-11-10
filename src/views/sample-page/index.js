import React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Form from '@rjsf/material-ui';
import { graphql, Link, useStaticQuery } from "gatsby"

const steps = [
  'Step 1 ',
  'Step 2 ',
  'Step 3'
]

export default function SamplePage() {
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNextClick = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBackClick = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleResetClick = () => {
    setActiveStep(0)
  }

  // const Form = JSONSchemaForm.default;
  const dataForm = useStaticQuery(graphql`
  query MyQuery {
    allStrapiForms {
      edges {
        node {
          step {
            firstStep {
              properties {
                firstName {
                  title
                  type
                }
                lastName {
                  title
                  type
                }
                radio {
                  description
                  title
                  type
                }
                select {
                  description
                  title
                  type
                }
                datetime {
                  format
                  type
                }
              }
              required
              title
              type
            }
          }
        }
      }
    }
  }
  `)
  const schema = dataForm?.allStrapiForms.edges[1].node?.step.firstStep
  const uiSchema = {
    "radio": {
      "ui:widget": "radio"
    },
    "select": {
      "ui:widget": "select"
    },
    "alt-datetime": {
      "ui:widget": "alt-datetime",
      "ui:options": {
        "yearsRange": [
          1980,
          2030
        ]
      }
    },
  }
// const schema = {
//   title: "Sign up",
//   type: "object",
//   required: ["firstName", "lastName"],
//   properties: {
//     'firstName': {type: "string", title: "First Name"},
//     'lastName': {type: "string", title: "Last Name"},
//     "select": {
//       type: "boolean",
//       title: "check box",
//       description: "This is the select-description"
//     }
//   }
// };

  return (
    <Box sx={{ px: '139px', pb: 5 }}>
      {console.log('data Form', dataForm)}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 5 }}>
        <Stepper
          sx={{
            px: 0
          }}
          activeStep={activeStep}
        >
          {steps.map((label, index) => {
            const stepProps = {}
            const labelProps = {}
            return (
              <Step
                sx={{
                  color: '#fff',
                  p: 0,
                  mx: '1px',
                  '& .MuiSvgIcon-root': {
                    border: '2px solid #fff',
                    borderRadius: '50%',
                    fontSize: '30px'
                  },
                  '& .MuiSvgIcon-root.Mui-active': {
                    color: '#3271D2'
                  },
                  '& .MuiSvgIcon-root.Mui-completed': {
                    color: '#3271D2'
                  },
                  '& .MuiStepLabel-iconContainer': {
                    p: 0,
                    mr: '8px',
                    backgroundColor: '#fff',
                    borderRadius: '50%'
                  }
                }}
                key={label}
                {...stepProps}
              >
                <StepLabel
                  active
                  sx={{
                    backgroundColor: activeStep >= index ? '#3271D2' : '#B9BFCA',
                    p: 3,
                    px: 25,
                    '& .MuiStepLabel-label': {
                      color: '#fff'
                    },
                    '& .MuiStepLabel-label.Mui-active': {
                      color: '#fff'
                    },
                    '& .MuiStepLabel-label.Mui-completed': {
                      color: '#fff'
                    }
                  }}
                  {...labelProps}
                >
                  {label}
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </Box>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleResetClick}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          {/* <Typography sx={{ mt: 5, mb: 2 }} variant="h5" color="#3271D2">
            Sign up
          </Typography> */}
          <Form 
            schema={schema}
            uiSchema={uiSchema}
            onChange={console.log("changed")}
            onSubmit={console.log("submitted")}
            onError={console.log("errors")} />
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, px: 5 }}>
            {activeStep > 0 && (
              <Button
                style={{ fontSize: '16px', fontWeight: 700, width: '240px' }}
                color="inherit"
                variant="contained"
                disabled={activeStep === 0}
                onClick={handleBackClick}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            )}
            <Box sx={{ flex: '1 1 auto' }} />

            <Button
              variant="contained"
              style={{ backgroundColor: '#3271D2', fontSize: '16px', fontWeight: 700, width: '240px' }}
              onClick={handleNextClick}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
}
