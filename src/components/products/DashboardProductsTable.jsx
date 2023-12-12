/* eslint-disable no-unused-vars */
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  Button,
  useDisclosure,
  Text,
  Heading,
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useCreateDashboardProductsMutation,
  useDeleteDashboardProductMutation,
  useGetDashboardProductsQuery,
  useUpdateDashboardProductMutation,
} from "../../app/services/apiSlice";
import TableSkeleton from "./TableSkeleton ";
import { FiEdit2 } from "react-icons/fi";
import { BsArrowLeft, BsArrowRight, BsPlus, BsTrash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { URL } from "../../store/type";
import { useEffect, useState } from "react";
import CustomAlertDialog from "../../shared/AlertDialog";
import CustomModal from "../../shared/Modal";
import { selectNetwork } from "../../app/features/networkSlice";
const DashboardProductsTable = () => {
  const { isOnline } = useSelector(selectNetwork);
  const [pageNo, setPageNo] = useState(1);
  const [clickedProductId, setClickedProductId] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [productToCreate, setProductToCreate] = useState({
    title: "",
    description: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();

  const { data, isLoading } = useGetDashboardProductsQuery({ page: pageNo });
  const [destroyProduct, { isLoading: isDestroying, isSuccess }] =
    useDeleteDashboardProductMutation();
  const [
    updateProduct,
    { isLoading: isUpdating, isSuccess: isUpdatingSuccess },
  ] = useUpdateDashboardProductMutation();

  const [
    createProduct,
    { isLoading: isCreating, isSuccess: isCreatingSuccess },
  ] = useCreateDashboardProductsMutation();

  const totalPages = data?.meta?.pagination.pageCount || 0;
  const handleNextPage = () => {
    if (pageNo < totalPages) {
      setPageNo((prevPage) => prevPage + 1);
    }
  };
  const handlePrevPage = () => {
    pageNo > 1 && setPageNo((prevPageNo) => prevPageNo - 1);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
  };
  const onChangePriceHandler = (value) =>
    setProductToEdit({
      ...productToEdit,
      price: +value,
    });

  const onChangeStockHandler = (value) =>
    setProductToEdit({
      ...productToEdit,
      stock: +value,
    });
  const onChangeThumbnailHandler = (e) => setThumbnail(e.target.files[0]);
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: productToEdit.title,
        description: productToEdit.description,
        price: productToEdit.price,
        stock: productToEdit.stock,
      })
    );
    formData.append("files.thumbnail", thumbnail);
    updateProduct({ id: clickedProductId, body: formData });
    // console.log(productToEdit)
  };

  /** --------- CREATING --------- */
  const onChangeCreateHandler = (e) => {
    const { name, value } = e.target;

    setProductToCreate({
      ...productToCreate,
      [name]: value,
    });
  };

  const onChangePriceCreateHandler = (value) =>
    setProductToCreate({
      ...productToCreate,
      price: +value,
    });

  const onChangeStockCreateHandler = (value) =>
    setProductToCreate({
      ...productToCreate,
      stock: +value,
    });

  const onSubmitCreateHandler = () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: productToCreate.title,
        description: productToCreate.description,
        price: productToCreate.price,
        stock: productToCreate.stock,
      })
    );
    formData.append("files.thumbnail", thumbnail);
    createProduct(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      setClickedProductId(null);
      onClose();
    }
    if (isUpdatingSuccess) {
      setClickedProductId(null);
      onModalClose();
    }
    if (isCreatingSuccess) {
      onCreateModalClose();
    }
  }, [
    isSuccess,
    isUpdatingSuccess,
    isCreatingSuccess,
    onClose,
    onModalClose,
    onCreateModalClose,
  ]);
  if (isLoading || !isOnline) {
    return <TableSkeleton />;
  }

  return (
    <>
      <Flex maxW="85%" mx={"auto"} justifyContent={"space-between"}>
        <Heading
          as={"span"}
          position={"relative"}
          _after={{
            content: "''",
            width: "full",
            height: "25%",
            position: "absolute",
            bottom: 1,
            left: 0,
            bg: "purple.100",
            zIndex: -1,
          }}
          color={"purple.300"}
        >
          All Products
        </Heading>
        <Button
          colorScheme="green"
          onClick={() => {
            onCreateModalOpen();
          }}
          ml={"auto"}
          w={"fit-content"}
          leftIcon={<BsPlus />}
        >
          Create
        </Button>
      </Flex>
      <TableContainer
        maxW="85%"
        mx="auto"
        border={"1px solid gray"}
        rounded={"lg"}
        my={4}
      >
        <Table variant="simple">
          <TableCaption>
            <Flex justifyContent={"space-between"} gap={{ base: 0, md: 4 }}>
              <Button
                leftIcon={<BsArrowLeft />}
                onClick={handlePrevPage}
                cursor={pageNo === 1 ? "not-allowed" : "pointer"}
                opacity={pageNo === 1 ? 0.2 : 1}
              >
                Prev
              </Button>
              <Text>
                {data.data.length &&
                  " Total Products: " + data.meta.pagination.total}{" "}
              </Text>
              <Button
                rightIcon={<BsArrowRight />}
                onClick={handleNextPage}
                cursor={pageNo === totalPages ? "not-allowed" : "pointer"}
                disabled={pageNo === totalPages}
                opacity={pageNo === totalPages ? 0.2 : 1}
              >
                Next
              </Button>
            </Flex>
          </TableCaption>
          <Thead>
            <Tr>
              <Th display={{ base: "none", md: "table-cell" }}>ID</Th>
              <Th>Title</Th>
              <Th display={{ base: "none", md: "table-cell" }}>Category</Th>
              <Th display={{ base: "none", md: "table-cell" }}>Thumbnail</Th>
              <Th display={{ base: "none", md: "table-cell" }} isNumeric>
                Price
              </Th>
              <Th display={{ base: "none", md: "table-cell" }} isNumeric>
                Stock
              </Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data?.map((product) => (
              <Tr key={product.id}>
                <Td display={{ base: "none", md: "table-cell" }}>
                  {product?.id}
                </Td>
                <Td>{product?.attributes?.title}</Td>
                <Td display={{ base: "none", md: "table-cell" }}>
                  {product?.attributes?.category?.data?.attributes?.title ??
                    "N/A"}
                </Td>
                <Td display={{ base: "none", md: "table-cell" }}>
                  <Image
                    borderRadius="full"
                    objectFit={"cover"}
                    boxSize={"40px"}
                    src={
                      product?.attributes?.thumbnail?.data?.attributes?.formats?.thumbnail?.url
                    }
                    alt={product?.attributes?.title}
                  />
                </Td>
                <Td display={{ base: "none", md: "table-cell" }} isNumeric>
                  ${product?.attributes?.price}
                </Td>
                <Td display={{ base: "none", md: "table-cell" }} isNumeric>
                  {product?.attributes?.stock}
                </Td>
                <Td>
                  <Button
                    as={Link}
                    to={`products/${product.id}`}
                    colorScheme="purple"
                    variant="solid"
                    mr={{ base: 0, md: 3 }}
                  >
                    <AiOutlineEye />
                  </Button>
                  <Button
                    colorScheme="red"
                    variant="solid"
                    mr={{ base: 0, md: 3 }}
                    onClick={() => {
                      setClickedProductId(product.id);
                      onOpen();
                    }}
                  >
                    <BsTrash />
                  </Button>
                  <Button
                    colorScheme="blue"
                    variant="solid"
                    onClick={() => {
                      setClickedProductId(product.id);
                      setProductToEdit(product);
                      onModalOpen();
                    }}
                  >
                    <FiEdit2 />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th display={{ base: "none", md: "table-cell" }}>ID</Th>
              <Th>Title</Th>
              <Th display={{ base: "none", md: "table-cell" }}>Category</Th>
              <Th display={{ base: "none", md: "table-cell" }}>Thumbnail</Th>
              <Th display={{ base: "none", md: "table-cell" }} isNumeric>
                Price
              </Th>
              <Th display={{ base: "none", md: "table-cell" }} isNumeric>
                Stock
              </Th>
              <Th>Action</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      <CustomAlertDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        title={"Are you sure?"}
        description={
          "Do you really want to destroy this product? This product cannot be undone."
        }
        okTxt="Destroy"
        isLoading={isDestroying}
        onOkHandler={() => {
          destroyProduct(clickedProductId);
        }}
      />
      <CustomModal
        isOpen={isModalOpen}
        onOpen={onModalOpen}
        onClose={onModalClose}
        title={`Update product ${productToEdit?.attributes?.title}`}
        okTxt="Update"
        isLoading={isUpdating}
        onOkClick={onSubmitHandler}
      >
        <Box as="form" onSubmit={onSubmitHandler}>
          <FormControl isRequired my={3}>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              defaultValue={productToEdit?.attributes?.title}
              onChange={onChangeHandler}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Product Description"
              name="description"
              defaultValue={productToEdit?.attributes?.description}
              onChange={onChangeHandler}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <NumberInput
              step={10}
              name="price"
              defaultValue={productToEdit?.attributes?.price}
              onChange={onChangePriceHandler}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Count in Stock</FormLabel>
            <NumberInput
              step={1}
              defaultValue={productToEdit?.attributes?.stock}
              name="stock"
              onChange={onChangeStockHandler}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Thumbnail</FormLabel>
            <Input
              id="thumbnail"
              type="file"
              h={"full"}
              p={2}
              accept="image/png, image/gif, image/jpeg"
              name="thumbnail"
              onChange={onChangeThumbnailHandler}
            />
          </FormControl>
        </Box>
      </CustomModal>
      <CustomModal
        isOpen={isCreateModalOpen}
        onClose={onCreateModalClose}
        title={"Update Product"}
        okTxt="Upload"
        onOkClick={onSubmitCreateHandler}
        isLoading={isCreating}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            my={3}
            placeholder="Product Title"
            name="title"
            value={productToCreate?.title}
            onChange={onChangeCreateHandler}
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Product Description"
            name="description"
            value={productToCreate?.description}
            onChange={onChangeCreateHandler}
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel>Price</FormLabel>
          <NumberInput
            name="price"
            defaultValue={productToCreate?.price}
            onChange={onChangePriceCreateHandler}
            precision={2}
            step={0.2}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Count in Stock</FormLabel>
          <NumberInput
            precision={2}
            step={0.2}
            name="price"
            defaultValue={productToCreate?.stock}
            onChange={onChangeStockCreateHandler}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            id="thumbnail"
            type="file"
            h={"full"}
            p={2}
            accept="image/png, image/gif, image/jpeg"
            onChange={onChangeThumbnailHandler}
          />
        </FormControl>
      </CustomModal>
    </>
  );
};

export default DashboardProductsTable;
