#include <cassert>
#include <iostream>
#include "Matrix.hpp"

// REQUIRES: mat points to a Matrix
//           0 < width && width <= MAX_MATRIX_WIDTH
//           0 < height && height <= MAX_MATRIX_HEIGHT
// MODIFIES: *mat
// EFFECTS:  Initializes *mat as a Matrix with the given width and height.
// NOTE:     Do NOT use new or delete here.
void Matrix_init(Matrix* mat, int width, int height) {
  // assert(false); // TODO Replace with your implementation!
  mat -> width = width;
  mat -> height = height;
}

// REQUIRES: mat points to a valid Matrix
// MODIFIES: os
// EFFECTS:  First, prints the width and height for the Matrix to os:
//             WIDTH [space] HEIGHT [newline]
//           Then prints the rows of the Matrix to os with one row per line.
//           Each element is followed by a space and each row is followed
//           by a newline. This means there will be an "extra" space at
//           the end of each line.
void Matrix_print(const Matrix* mat, std::ostream& os) {
  int width = mat -> width;
  int height = mat -> height;

  os << width << " " << height << std::endl;
  
  const int *ptr = mat -> data;
  const int *ptr1 = ptr; 
  const int *ptr2;
  //int i = 0;

  for (; ptr1 < ptr + (height*width); ptr1+=width){
    for (ptr2 = ptr1; ptr2 < ptr1 + width; ptr2++){
      os << *ptr2 << " ";
    }
    os << std::endl; 
    //i++;
  }
  //for (int i = 0; i < height; i++){
    //for (int j = (i*width); j < (width*i + width); j++ ){
      //os << array1[j] << " ";
    //}
    //os << std::endl; 
  //}
  //assert(false); // TODO Replace with your implementation!
}

// REQUIRES: mat points to an valid Matrix
// EFFECTS:  Returns the width of the Matrix.
int Matrix_width(const Matrix* mat) {
  return mat -> width;
  // assert(false); // TODO Replace with your implementation!
}

// REQUIRES: mat points to a valid Matrix
// EFFECTS:  Returns the height of the Matrix.
int Matrix_height(const Matrix* mat) {
  return mat -> height;
  // assert(false); // TODO Replace with your implementation!
}

// REQUIRES: mat points to a valid Matrix
//           ptr points to an element in the Matrix
// EFFECTS:  Returns the row of the element pointed to by ptr.
int Matrix_row(const Matrix* mat, const int* ptr) {
  const int *first = mat -> data;
  const int difference = ptr-first;
  int row_index = difference/(mat->width);
  return row_index;
  //assert(false); // TODO Replace with your implementation!
}

// REQUIRES: mat points to a valid Matrix
//           ptr point to an element in the Matrix
// EFFECTS:  Returns the column of the element pointed to by ptr.
int Matrix_column(const Matrix* mat, const int* ptr) {
  const int *first = mat -> data;
  int width = mat->width;
  const int difference = ptr-first;
  int col_index;
  if (difference >= width){
    col_index = difference%(width);
  } else {
    col_index = difference%(width);
  }
  return col_index;
  //assert(false); // TODO Replace with your implementation!
}

// REQUIRES: mat points to a valid Matrix
//           0 <= row && row < Matrix_height(mat)
//           0 <= column && column < Matrix_width(mat)
//
// MODIFIES: (The returned pointer may be used to modify an
//            element in the Matrix.)
// EFFECTS:  Returns a pointer to the element in the Matrix
//           at the given row and column.
int* Matrix_at(Matrix* mat, int row, int column) {
  int length = 0;
  int *first = mat -> data;
  for(int i = 0; i < row; i++){
    length = length + mat->width;
  }
  length = length + column;
  int *ptr = first + length;
  return ptr;
  //assert(false); // TODO Replace with your implementation!
}

// REQUIRES: mat points to a valid Matrix
//           0 <= row && row < Matrix_height(mat)
//           0 <= column && column < Matrix_width(mat)
//
// EFFECTS:  Returns a pointer-to-const to the element in
//           the Matrix at the given row and column.
const int* Matrix_at(const Matrix* mat, int row, int column) {
  int length = 0;
  const int *first = mat -> data;
  for(int i = 0; i < row; i++){
    length = length + mat->width;
  }
  length = length + column;
  const int * ptr = first + length;
  return ptr;
  //assert(false); // TODO Replace with your implementation!
}

// REQUIRES: mat points to a valid Matrix
// MODIFIES: *mat
// EFFECTS:  Sets each element of the Matrix to the given value.
void Matrix_fill(Matrix* mat, int value) {
  int width = mat->width;
  int height = mat -> height;
  //int array [width * height];
  
  int *ptr = mat -> data;
  int *ptr1 = ptr;

  for (; ptr1 < ptr + (width*height); ptr1++){
    *ptr1 = value;
  }
  //assert(false); // TODO Replace with your implementation!
}

// REQUIRES: mat points to a valid Matrix
// MODIFIES: *mat
// EFFECTS:  Sets each element on the border of the Matrix to
//           the given value. These are all elements in the first/last
//           row or the first/last column.
void Matrix_fill_border(Matrix* mat, int value) {
  int width = mat-> width;
  int height = mat->height;
  int length = width*height;

  //int array[width*height];
  //memcpy(array, mat -> data, sizeof(mat -> data));

  int * ptr = mat -> data;
  for (int *ptr1 = ptr; ptr1 < ptr+width; ptr1++){
    *ptr1 = value;
  }
  for (int *ptr1 = ptr + length - width; ptr1 < ptr+ length; ptr1++){
    *ptr1 = value;
  } 
  for (int *ptr1 = ptr; ptr1 < ptr+length; ptr1+=width){
    *ptr1 = value;
  }
  for(int *ptr1 = ptr + width -1; ptr1 < ptr+length; ptr1+=width){
    *ptr1 = value;
  }

  //for(int i = 0; i<width; i++){
    //array[i] = value;
  //}
  //for(int i = length-width; i<length; i++){
   // array[i] = value;
  //}

  //for(int i = 0; i<length; i = i+width){
    //array[i] = value;./
  //}

  //for(int i = width-1; i<length; i = i+width){
    //array[i] = value;
  //}
  //memcpy(mat -> data, array, sizeof(array)); 
  //assert(false); // TODO Replace with your implementation!
}

// REQUIRES: mat points to a valid Matrix
// EFFECTS:  Returns the value of the maximum element in the Matrix
int Matrix_max(const Matrix* mat) {
  int width = mat->width;
  int height = mat -> height;
  //int array[width*height];
  //memcpy(array, mat -> data, sizeof(mat -> data));

  const int * ptr = mat -> data;
  const int * ptr1 = mat -> data;
  int max = *ptr1;

  for (; ptr1 < ptr + (width*height); ptr1++){
    if(*ptr1>max){
      max = *ptr1;
    }
  }
  //for (int i = 0; i < width*height; i++){
    //if(array[i]>max){
      //max = array[i];
    //}
  //}
  return max;
  //assert(false); // TODO Replace with your implementation!
}

// REQUIRES: mat points to a valid Matrix
//           0 <= row && row < Matrix_height(mat)
//           0 <= column_start && column_end <= Matrix_width(mat)
//           column_start < column_end
// EFFECTS:  Returns the column of the element with the minimal value
//           in a particular region. The region is defined as elements
//           in the given row and between column_start (inclusive) and
//           column_end (exclusive).
//           If multiple elements are minimal, returns the column of
//           the leftmost one.
int Matrix_column_of_min_value_in_row(const Matrix* mat, int row,
                                      int column_start, int column_end) {
                              
  int width = mat->width;
  //int height = mat-> height;
  //int array[width*height];
  //memcpy(array, mat -> data, sizeof(mat -> data));
  int index_start = (row * width) + column_start;

  const int *ptr = mat -> data;
  const int *ptr1 = ptr + index_start; 
  const int *ptr_point = ptr1;
  //int index_end = (row * width) + column_end;
  int min = *ptr1;
  int col_index;
  //int final_index = index_start;
  for (; ptr1 < ptr+(row * width)+column_end; ptr1++){
    if(*ptr1<min){
      min = *ptr1;
      ptr_point = ptr1;
    }
    //USE THE MATRIX_COLUMN FUNCTION 
  }
  col_index = Matrix_column(mat,ptr_point);
  return col_index;
  //assert(false); // TODO Replace with your implementation!
}

// REQUIRES: mat points to a valid Matrix
//           0 <= row && row < Matrix_height(mat)
//           0 <= column_start && column_end <= Matrix_width(mat)
//           column_start < column_end
// EFFECTS:  Returns the minimal value in a particular region. The region
//           is defined as elements in the given row and between
//           column_start (inclusive) and column_end (exclusive).
int Matrix_min_value_in_row(const Matrix* mat, int row,
                            int column_start, int column_end) {

  //COPIED FROM PPREVIOUS FUNCTION
  int width = mat-> width;
  //int height = mat-> height;
  //int array[width*height];
  //memcpy(array, mat -> data, sizeof(mat -> data));
  int index_start = (row * width) + column_start;

  const int *ptr = mat -> data;
  const int *ptr1 = ptr + index_start; 
  int index_end = (row * width) + column_end;
  int min = *ptr1;

  //int min = array[index_start];
  //int final_index = index_start;
  for(; ptr1 < ptr + index_end; ptr1++){
    if(*ptr1 < min){
      min = *ptr1;
    }
  }
  //for (int i = index_start; i < index_end; i++){
    //if(array[i]<min){
      //min = array[i];
    //}
   //USE THE MATRIX_COLUMN FUNCTION 
  //}
  return min;
  //assert(false); // TODO Replace with your implementation!
}
