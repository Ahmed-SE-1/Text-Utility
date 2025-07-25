

export default function Alert(props) {
  return (
    props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
        {props.alert.msg}
    </div>
  )
}
