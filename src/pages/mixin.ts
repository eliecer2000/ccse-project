import { Loading, QSpinnerBall } from 'quasar';
export const loadingBox = (typeLoading = false) => {
  if (!typeLoading) {
    Loading.hide();
  } else {
    Loading.show({
      message: 'Conectando, Espere por favor...',
      boxClass: 'bg-grey-2 text-grey-9',
      spinnerColor: 'primary',
      spinnerSize: 100,
      spinner: QSpinnerBall,
    });
  }
};
