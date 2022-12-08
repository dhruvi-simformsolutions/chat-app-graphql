import React from "react"

function Message ({messages,user,username}) {
    return (
        <div>
             {messages?.map(({ id, content,sender:sender_id }) => (
            <div
              style={{
                display: "flex",
                justifyContent:
                  user?.id === sender_id ? "flex-end" : "flex-start",
                paddingBottom: "1em",
              }}
              key={id}
            >
              {user?.id !== sender_id && (
                <div
                  style={{
                    height: 40,
                    width: 40,
                    marginRight: "0.5em",
                    border: "2px solid #e5e6ea",
                    borderRadius: 25,
                    textAlign: "center",
                    fontSize: "18pt",
                    paddingTop: 5,
                  }}
                >
                  {username.slice(0, 1).toUpperCase()}
                </div>
              )}
              <div
                style={{
                  background: user?.id !== sender_id ? "#00b5ad" : "#e5e6ea",
                  color: user?.id !== sender_id ? "white" : "black",
                  padding: "1em",
                  borderRadius: "1em",
                  maxWidth: "60%",
                }}
              >
                {content}
              </div>
            </div>
          ))}
        </div>
    )
}

export default Message