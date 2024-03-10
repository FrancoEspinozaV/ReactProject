import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from 'react';
import { SquareType } from '../types';

const Transition = forwardRef(function Transition (
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function ocultarDigitosTelefono (telefono: string): string {
  // Verificar si el teléfono está en el formato correcto
  const formatoTelefono = /^\+56 9 \d{4} \d{4}$/;
  if (!formatoTelefono.test(telefono)) {
    throw new Error('El formato del teléfono no es válido');
  }

  // Dividir el teléfono en prefijo, dígitos ocultos y sufijo
  const prefijo = telefono.slice(0, 6); // "+56 9 "
  const digitosOcultos = 'XXXX ';
  const sufijo = telefono.slice(11, 15); // " 0549"

  // Devolver el teléfono con dígitos ocultos
  return prefijo + digitosOcultos + sufijo;
}

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  userWin: SquareType
}
export function Modal ({ open, setOpen, userWin }: Props) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Ganador/a ${userWin.userData.name}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className='text-black'>

              <p>Felicidades al ganador/a:</p>
              <ul>
                <li>
                  - Nombre: <span className='font-bold text-black'>{userWin.userData.name}</span>
                </li>
                <li>
                  - Telefono: {ocultarDigitosTelefono(userWin.userData.phone)}
                </li>
              </ul>
              <p>
                Con el numero ganador: {userWin.placeholder}
              </p>
              <p className='font-semibold'>
                Gracias por participar
              </p>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}