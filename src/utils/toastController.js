import { createStandaloneToast } from '@chakra-ui/toast'

const { toast } = createStandaloneToast();

const ToastController = (title, status, position, duration, isClosable) => {
  toast({
    title: title,
    status: status,
    position: position,
    variant: "left-accent",
    duration: duration ? duration : 4000,
    isClosable: isClosable ? isClosable : true,
  });
};

export default ToastController;
