<Item>
    {videoconferencias.length > 0 ? (
        <List>
            {videoconferencias.map((videoconferencia, index) => (
                <React.Fragment key={index}>
                    <ListItem
                        secondaryAction={
                            <IsolatedMenu videoconferenciaId={videoconferencia._id} />
                        } disablePadding>
                        <ListItemButton component={Link} href={videoconferencia.link} target="_blank" rel="noopener">
                            <ListItemText primary={videoconferencia.solicitante} secondary={moment(videoconferencia.data_e_hora).format("D/M/YYYY") + " " + moment(videoconferencia.data_e_hora).format("H[h]mm[min]") + " - " + videoconferencia.sala} />
                        </ListItemButton>
                    </ListItem>
                    {index + 1 < videoconferencias.length && <Divider />}
                </React.Fragment>
            ))}
        </List>
    ) : (
        <NaoHaVideoconferencia>
            <Typography variant="body1">
                Não há videoconferência agendada para os parâmetros selecionados.
            </Typography>
        </NaoHaVideoconferencia>
    )}
</Item>