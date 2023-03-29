import { useContext, useRef, useState } from "react";
import { AccountAdmin, AuthContext } from "../../contexts/AuthContext";
import ToastController from "../../utils/toastController";
import { toastPosition, toastStatus } from "../../utils/commonData";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export const ChangePassword = () => {
  const { signOut } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const [data, setData] = useState({
    old: "",
    new: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const handleViewOldPass = () => setShowOldPass(!showOldPass);
  const handleViewNewPass = () => setShowNewPass(!showNewPass);

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (data.old === AccountAdmin.password) {
      setLoading(true);
      AccountAdmin.password = data.new;
      onClose();
      signOut();
      ToastController(
        "Change password successfully",
        toastStatus.success,
        toastPosition.topRight
      );
    } else {
      ToastController(
        "Old password is incorrect",
        toastStatus.error,
        toastPosition.topRight
      );
    }
  };

  const handleCancle = () => {
    onClose();
    setData({ old: "", new: "" });
    setShowOldPass(false);
    setShowNewPass(false);
  };

  return (
    <div>
      <Button mt={2} onClick={onOpen}>
        Change password
      </Button>
      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Old password</FormLabel>
              <InputGroup>
                <Input
                  value={data.old}
                  type={showOldPass ? "text" : "password"}
                  ref={initialRef}
                  placeholder="Enter old password"
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, old: e.target.value }))
                  }
                />
                <InputRightElement width="3.5rem">
                  {/* <IconButton icon={ showPass ? <ViewOffIcon /> : <ViewIcon />} onClick={handleViewPass}/> */}
                  <Button h="1.5rem" size="xs" onClick={handleViewOldPass}>
                    {showOldPass ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {data.old && (
              <FormControl mt={4}>
                <FormLabel>New password</FormLabel>
                <InputGroup>
                  <Input
                    value={data.new}
                    type={showNewPass ? "text" : "password"}
                    placeholder="Enter new password"
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, new: e.target.value }))
                    }
                  />
                  <InputRightElement width="3.5rem">
                    {/* <IconButton icon={ showPass ? <ViewOffIcon /> : <ViewIcon />} onClick={handleViewPass}/> */}
                    <Button h="1.5rem" size="xs" onClick={handleViewNewPass}>
                      {showNewPass ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handleCancle}>
              Cancel
            </Button>
            <Button
              isDisabled={!data.old || !data.new}
              isLoading={isLoading}
              loadingText="Submitting"
              colorScheme="blue"
              onClick={handleChangePassword}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
