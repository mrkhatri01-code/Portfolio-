exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  try {
    // Parse the JSON body
    const data = JSON.parse(event.body)
    const { name, email, message } = data

    // Validate the data
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      }
    }

    // Log the submission (this will appear in your Netlify function logs)
    console.log("Contact form submission:", { name, email, message })

    // Here you could add code to send an email or store the data
    // For now, we'll just return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Contact form submission received",
      }),
    }
  } catch (error) {
    console.error("Error processing contact form:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Error processing your request",
      }),
    }
  }
}

