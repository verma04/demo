export const formEncode = data => {
    return Object.keys(data)
        .map(key => {
            if (Array.isArray(data[key])) {
                // Encode each array item with the same key
                return data[key].map(item => encodeURIComponent(key) + "=" + encodeURIComponent(item)).join('&');
            } else {
                // Encode regular values
                return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
            }
        })
        .join("&");
}


export const submitContactForm = (data, setSubmitting, resetForm, formName) => {
    const formBody = formEncode({
        "form-name": formName,
        ...data,
    })
    fetch("/", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: formBody,
    })
        .then(() => {
            // Show success toast
            toast.success('Form Successfully Submitted!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            setSubmitting(false);
            resetForm();
        })
        .catch(() => {
            // Show error toast in case of fetch failure
            toast.error('Submission failed. Please try again.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        });
}