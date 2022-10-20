# Proof Of Concept Project

# 1. Introduction

To create a form component using react-hook-form that has the following

- [ ] Validation --> on error, scroll and focus to the earliest invalid field
- [ ] Standardized Display of Label, Description, Tooltip and Error
- [ ] Disabling form elements while form is being submitted
- [ ] Able to handle array fields
- [ ] Determine patterns for conditional validation
- [x] Error message can render links to another page
- [ ] Abstraction for forms to be saved in local storage if it is not submitted
- [x] Prevents user from closing the tab/page if they are in a dirtied form

First Example of Creating a Character

- [x] An auto complete input that validates duplicate profile name
- [x] Checkbox between "job types", if "hero" is chosen --> Character Name can be Empty else cannot be empty.

Second Example, Abstracting out Form Component

- [ ] Creation of Compound Components (halfway there)

Third Example of Handling Array Fields

- [ ] Basically a form within a form that populates the form

<br>

# 2. Learning Points & TLDR from React-Hook-Form Documentation

- This portion aims to highlight the main hooks used and what are some key points to note when using the hooks. Aims to get you up to speed without digging through the entire documentation.

## `useForm`

`formState`

- `isDirty`: Returns boolean, check if forms is dirty, require default values to be set as underlying it uses deep copy to check.
- `dirtyFields`: Returns object of dirtied fields with key being the fieldName and value being a boolean.
- `touchedFields`: Return object, if you focused the field before, it will change to true for the particular field name
- `isValid`: Returns boolean, only works if you used mode: "onChange"

<br>

## `useController`

- Used for creating reusable Controlled Input
- Literally just powers `Controller` https://react-hook-form.com/api/usecontroller/controller

<br>

# 3. Learning Points & TLDR from Zod Documentation
